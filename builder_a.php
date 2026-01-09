<?php
declare(strict_types=1);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Text Tasker (Length + Unicode Char Builder)</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { background: #0b1220; }
    .card { background: #0f1a2e; border: 1px solid rgba(255,255,255,.08); }
    .muted, form-label { color: rgba(255,255,255,.78) !important; }     /* brighter than text-muted */
    .muted2 { color: rgba(255,255,255,.88) !important; }    /* even brighter for key labels */
    .log {
      background: rgba(255,255,255,.05);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      padding: 12px;
      max-height: 320px;
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 12px;
      white-space: pre-wrap;
      color: rgba(255,255,255,.88);
    }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    .badge-soft { background: rgba(13,110,253,.15); color: #9ec5fe; border: 1px solid rgba(13,110,253,.25); }
    .statbox {
      background: rgba(255,255,255,.04);
      border: 1px solid rgba(255,255,255,.10);
    }
    .statval { color: rgba(255,255,255,.96); }
    .statlabel { color: rgba(255,255,255,.88); }
  </style>
</head>
<body class="text-light">
  <div class="container py-4">
    <div class="row g-3">
      <div class="col-lg-5">
        <div class="card rounded-4 shadow-sm">
          <div class="card-body">
            <h4 class="mb-1">Text Tasker</h4>
            <p class="muted mb-3">
              Part 1 settles length (stability rule). Part 2 settles each unicode codepoint per position, then builds the statement.
            </p>

            <div class="mb-3">
              <label class="form-label">Endpoint</label>
              <input id="endpoint" class="form-control form-control-lg mono" value="./sql_lab2.php" />
              <div class="form-text muted">Keep same-origin so browser sends session cookies automatically.</div>
            </div>

            <div class="mb-3">
              <label class="form-label">Command (must be wrapped in brackets)</label>
              <input id="command" class="form-control form-control-lg mono" value="(run.country2president)" />
            </div>

            <div class="row g-2 mb-3">
              <div class="col-4">
                <label class="form-label">sleep (server)</label>
                <input id="sleepParam" class="form-control mono" value="5" />
              </div>
              <div class="col-4">
                <label class="form-label">Client delay</label>
                <select id="delayMs" class="form-select">
                  <option value="0">0ms</option>
                  <option value="100">100ms</option>
                  <option value="250" selected>250ms</option>
                  <option value="500">500ms</option>
                  <option value="1000">1000ms</option>
                </select>
              </div>
              <div class="col-4">
                <label class="form-label">Concurrency</label>
                <select id="concurrency" class="form-select">
                  <option value="1">1 (safe)</option>
                  <option value="2">2</option>
                  <option value="3" selected>3</option>
                  <option value="5">5</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>

            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="form-label">No-result tolerance (per settle)</label>
                <input id="noResultMax" class="form-control mono" value="8" />
                <div class="form-text muted">How many “All time - …” / invalid responses allowed before stopping.</div>
              </div>
              <div class="col-6">
                <label class="form-label">Max attempts (per settle)</label>
                <input id="maxAttempts" class="form-control mono" value="80" />
                <div class="form-text muted">Hard cap to avoid infinite looping.</div>
              </div>
            </div>

            <div class="d-flex gap-2">
              <button id="btnStart" class="btn btn-primary btn-lg flex-grow-1">Start</button>
              <button id="btnCancel" class="btn btn-outline-warning btn-lg" disabled>Cancel</button>
              <button id="btnReset" class="btn btn-outline-light btn-lg">Reset</button>
            </div>

            <hr class="border-light border-opacity-10 my-4">

            <div class="small muted">
              <div class="mb-2">
                <span class="badge badge-soft rounded-pill">Stability rule</span>
                keep querying until a number repeats; the repeated value is selected.
              </div>
              <div class="mb-2">
                <span class="badge badge-soft rounded-pill">No-result handling</span>
                no-result responses are retried up to tolerance, not immediate fail.
              </div>
              <div>
                <span class="badge badge-soft rounded-pill">Parallel build</span>
                resolves multiple positions at once (concurrency), then prints final ordered output.
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="col-lg-7">
        <div class="card rounded-4 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h5 class="mb-0">Progress</h5>
              <span class="badge text-bg-secondary" id="phaseBadge">Idle</span>
            </div>

            <div class="mb-2 muted" id="statusLine">Ready.</div>

            <div class="progress mb-3" style="height: 18px;">
              <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%"></div>
            </div>

            <div class="row g-2 mb-3">
              <div class="col-md-4">
                <div class="p-3 rounded-3 statbox">
                  <div class="small statlabel">Length (settled)</div>
                  <div class="fs-4 mono statval" id="lenValue">—</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 rounded-3 statbox">
                  <div class="small statlabel">Char position (latest)</div>
                  <div class="fs-4 mono statval" id="charPosValue">—</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 rounded-3 statbox">
                  <div class="small statlabel">Statement so far</div>
                  <div class="fs-4 mono statval" id="soFarValue">—</div>
                </div>
              </div>
            </div>

            <div class="mb-2 d-flex justify-content-between align-items-center">
              <div class="muted small">Live log</div>
              <button id="btnClearLog" class="btn btn-sm btn-outline-light">Clear log</button>
            </div>
            <div class="log" id="logBox"></div>

            <hr class="border-light border-opacity-10 my-4">

            <h5 class="mb-2">Final result</h5>
            <div class="p-3 rounded-4 mono" style="background: rgba(25,135,84,.10); border:1px solid rgba(25,135,84,.25); min-height: 56px;">
              <span id="finalResult" class="fs-5">—</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <script>
    let cancelled = false;

    // For parallel requests, we keep a list
    let activeXhrs = [];

    const ui = {
      log: (msg) => {
        const ts = new Date().toISOString().replace("T"," ").replace("Z","");
        const box = $("#logBox");
        box.append(document.createTextNode(`[${ts}] ${msg}\n`));
        box.scrollTop(box[0].scrollHeight);
      },
      setPhase: (t, badgeClass) => {
        const b = $("#phaseBadge");
        b.text(t);
        b.removeClass("text-bg-secondary text-bg-primary text-bg-warning text-bg-success text-bg-danger");
        b.addClass(badgeClass);
      },
      setStatus: (t) => $("#statusLine").text(t),
      setProgress: (pct) => $("#progressBar").css("width", Math.max(0, Math.min(100, pct)) + "%"),
      setLen: (v) => $("#lenValue").text(v ?? "—"),
      setPos: (v) => $("#charPosValue").text(v ?? "—"),
      setSoFar: (v) => $("#soFarValue").text(v ?? "—"),
      setFinal: (v) => $("#finalResult").text(v ?? "—"),
      enableRun: (running) => {
        $("#btnStart").prop("disabled", running);
        $("#btnCancel").prop("disabled", !running);
      }
    };

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function parseResponseText(raw) {
      const t = String(raw || "").trim();
      if (!t) return { ok:false, reason:"Empty response", value:null, raw:t };

      if (t.toLowerCase().includes("all time -")) {
        return { ok:false, reason:"No result found (All time - ...)", value:null, raw:t, noResult:true };
      }

      const m = t.match(/result\s*:\s*(-?\d+)/i);
      if (m) return { ok:true, reason:null, value: parseInt(m[1],10), raw:t, noResult:false };

      return { ok:false, reason:"Unrecognized response format", value:null, raw:t, noResult:true };
    }

    function makeFormData({action, charpos, command, sleepVal}) {
      const fd = new FormData();
      fd.append("ptype", "2");
      fd.append("target", "1");
      fd.append("action", action);
      fd.append("finder", "1");
      fd.append("sleep", String(sleepVal));
      fd.append("charpos", charpos === null ? "" : String(charpos));
      fd.append("param", command);
      return fd;
    }

    function postToGameLab({endpoint, action, charpos, command, sleepVal}) {
      // Browser handles cookies for same-origin
      return new Promise((resolve, reject) => {
        const xhr = $.ajax({
          url: endpoint,
          method: "POST",
          data: makeFormData({action, charpos, command, sleepVal}),
          processData: false,
          contentType: false,
          dataType: "text",
          timeout: 60000
        });

        activeXhrs.push(xhr);

        xhr.done((raw) => resolve(raw))
           .fail((xhr, status, err) => {
             if (status === "abort") return reject(new Error("Request aborted"));
             reject(new Error("Request failed: " + (err || status)));
           })
           .always(() => {
             activeXhrs = activeXhrs.filter(x => x !== xhr);
           });
      });
    }

    async function settleNumber({label, probeFn, delayMs, noResultMax, maxAttempts}) {
      const seen = new Map(); // val->count
      let attempt = 0;
      let noResultCount = 0;

      while (true) {
        if (cancelled) throw new Error("Cancelled");
        attempt++;

        if (attempt > maxAttempts) {
          throw new Error(`${label}: exceeded max attempts (${maxAttempts}) without settling`);
        }

        ui.setStatus(`${label}: probing (attempt ${attempt})...`);
        ui.log(`${label} attempt ${attempt}`);

        const raw = await probeFn();
        ui.log(`Raw: ${raw}`);

        const parsed = parseResponseText(raw);

        if (!parsed.ok) {
          // NEW RULE: do not fail immediately; tolerate a number of no-result hits
          noResultCount++;
          ui.log(`⚠️ ${label}: ${parsed.reason}. no-result ${noResultCount}/${noResultMax}`);

          if (noResultCount >= noResultMax) {
            throw new Error(`${label}: too many no-result responses (${noResultCount}/${noResultMax})`);
          }

          if (delayMs > 0) await sleep(delayMs);
          continue;
        }

        // got a valid number; reset no-result streak
        noResultCount = 0;

        const val = parsed.value;
        seen.set(val, (seen.get(val) || 0) + 1);

        const summary = Array.from(seen.entries()).map(([k,c]) => `${k}×${c}`).join(", ");
        ui.log(`${label}: parsed=${val} (seen: ${summary})`);

        if (seen.get(val) >= 2) {
          ui.log(`✅ ${label} settled on ${val} (repeated)`);
          return val;
        }

        if (delayMs > 0) await sleep(delayMs);
      }
    }

    async function runWithConcurrency(total, concurrency, workerFn) {
      let nextIndex = 1;
      const results = new Array(total + 1);

      const workers = new Array(concurrency).fill(null).map(async () => {
        while (true) {
          if (cancelled) throw new Error("Cancelled");
          const i = nextIndex++;
          if (i > total) return;

          const res = await workerFn(i);
          results[i] = res;
        }
      });

      await Promise.all(workers);
      return results;
    }

    async function runTask() {
      cancelled = false;
      ui.enableRun(true);
      ui.setFinal("—");
      ui.setLen("—");
      ui.setPos("—");
      ui.setSoFar("—");
      ui.setProgress(0);

      const endpoint = $("#endpoint").val().trim();
      const command = $("#command").val().trim();
      const sleepVal = $("#sleepParam").val().trim();
      const delayMs = parseInt($("#delayMs").val(), 10) || 0;
      const concurrency = Math.max(1, parseInt($("#concurrency").val(), 10) || 1);
      const noResultMax = Math.max(0, parseInt($("#noResultMax").val(), 10) || 0);
      const maxAttempts = Math.max(1, parseInt($("#maxAttempts").val(), 10) || 1);

      if (!command.startsWith("(") || !command.endsWith(")")) {
        ui.setPhase("Error", "text-bg-danger");
        ui.setStatus("Command must be wrapped in brackets, e.g. (run.country2president)");
        ui.enableRun(false);
        return;
      }

      ui.log(`Starting. endpoint=${endpoint}, command=${command}, sleep=${sleepVal}`);
      ui.log(`Settings: delayMs=${delayMs}, concurrency=${concurrency}, noResultMax=${noResultMax}, maxAttempts=${maxAttempts}`);

      try {
        ui.setPhase("Length", "text-bg-primary");

        const length = await settleNumber({
          label: "Length",
          delayMs,
          noResultMax,
          maxAttempts,
          probeFn: () => postToGameLab({endpoint, action:"length", charpos:null, command, sleepVal})
        });

        ui.setLen(length);

        if (length <= 0) {
          ui.setPhase("Done", "text-bg-success");
          ui.setStatus("Length settled to 0. Nothing to build.");
          ui.setFinal("");
          ui.setProgress(100);
          return;
        }

        ui.setPhase("Chars", "text-bg-warning");
        ui.setStatus(`Length settled: ${length}. Building with concurrency=${concurrency}...`);

        const codepoints = new Array(length + 1);
        const chars = new Array(length + 1);
        let resolvedCount = 0;

        // Resolve positions in parallel, each position still settles by repeat rule
        await runWithConcurrency(length, concurrency, async (pos) => {
          ui.setPos(pos);

          const cp = await settleNumber({
            label: `Char(${pos})`,
            delayMs,
            noResultMax,
            maxAttempts,
            probeFn: () => postToGameLab({endpoint, action:"char", charpos:pos, command, sleepVal})
          });

          let ch = "";
          try {
            ch = String.fromCodePoint(cp);
          } catch (e) {
            throw new Error(`Invalid unicode codepoint ${cp} at charpos ${pos}`);
          }

          codepoints[pos] = cp;
          chars[pos] = ch;

          resolvedCount++;
          const pct = Math.floor((resolvedCount / length) * 100);
          ui.setProgress(pct);

          // Build partial “so far” in order (fill unknowns with ·)
          let partial = "";
          for (let i = 1; i <= length; i++) {
            partial += (chars[i] !== undefined ? chars[i] : "·");
          }
          ui.setSoFar(partial);

          ui.log(`✅ Char(${pos}) => ${cp} => "${ch}" (${resolvedCount}/${length})`);
          return true;
        });

        // Assemble final statement in correct order
        let built = "";
        for (let i = 1; i <= length; i++) built += (chars[i] ?? "");

        ui.setFinal(built);
        ui.setPhase("Done", "text-bg-success");
        ui.setStatus("Completed successfully.");
        ui.log(`FINAL RESULT: ${built}`);

      } catch (e) {
        const msg = (e && e.message) ? e.message : String(e);
        if (msg === "Cancelled") {
          ui.setPhase("Cancelled", "text-bg-secondary");
          ui.setStatus("Cancelled by user.");
          ui.log("⚠️ Cancelled.");
        } else {
          ui.setPhase("Error", "text-bg-danger");
          ui.setStatus("Stopped: " + msg);
          ui.log("❌ Stopped: " + msg);
        }
      } finally {
        ui.enableRun(false);
      }
    }

    $("#btnStart").on("click", () => runTask());

    $("#btnCancel").on("click", () => {
      cancelled = true;
      ui.log("Cancel requested.");
      ui.setStatus("Cancelling...");
      // Abort all active requests (parallel-safe)
      for (const x of activeXhrs) {
        try { x.abort(); } catch(e) {}
      }
      activeXhrs = [];
    });

    $("#btnReset").on("click", () => {
      cancelled = true;
      for (const x of activeXhrs) {
        try { x.abort(); } catch(e) {}
      }
      activeXhrs = [];

      ui.setPhase("Idle", "text-bg-secondary");
      ui.setStatus("Ready.");
      ui.setProgress(0);
      ui.setLen("—");
      ui.setPos("—");
      ui.setSoFar("—");
      ui.setFinal("—");
      $("#logBox").text("");
      ui.enableRun(false);
    });

    $("#btnClearLog").on("click", () => $("#logBox").text(""));
  </script>
</body>
</html>


