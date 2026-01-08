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
    .text-muted { color: rgba(255,255,255,.6) !important; }
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
      color: rgba(255,255,255,.85);
    }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    .badge-soft { background: rgba(13,110,253,.15); color: #9ec5fe; border: 1px solid rgba(13,110,253,.25); }
  </style>
</head>
<body class="text-light">
  <div class="container py-4">
    <div class="row g-3">
      <div class="col-lg-5">
        <div class="card rounded-4 shadow-sm">
          <div class="card-body">
            <h4 class="mb-1">Text Tasker</h4>
            <p class="text-muted mb-3">
              Part 1 settles the length (stability rule). Part 2 settles each unicode codepoint per position, then builds the statement.
            </p>

            <div class="mb-3">
              <label class="form-label">Endpoint</label>
              <input id="endpoint" class="form-control form-control-lg mono" value="./sql_lab2.php" />
              <div class="form-text text-muted">Use a same-origin path so cookies/sessions are sent automatically.</div>
            </div>

            <div class="mb-3">
              <label class="form-label">Command (must be wrapped in brackets)</label>
              <input id="command" class="form-control form-control-lg mono" value="(run.country2president)" />
            </div>

            <div class="row g-2 mb-3">
              <div class="col-6">
                <label class="form-label">sleep (server param)</label>
                <input id="sleepParam" class="form-control mono" value="5" />
              </div>
              <div class="col-6">
                <label class="form-label">Client delay between probes</label>
                <select id="delayMs" class="form-select">
                  <option value="0">0ms</option>
                  <option value="150">150ms</option>
                  <option value="300" selected>300ms</option>
                  <option value="750">750ms</option>
                  <option value="1200">1200ms</option>
                </select>
              </div>
            </div>

            <div class="d-flex gap-2">
              <button id="btnStart" class="btn btn-primary btn-lg flex-grow-1">Start</button>
              <button id="btnCancel" class="btn btn-outline-warning btn-lg" disabled>Cancel</button>
              <button id="btnReset" class="btn btn-outline-light btn-lg">Reset</button>
            </div>

            <hr class="border-light border-opacity-10 my-4">

            <div class="small text-muted">
              <div class="mb-2">
                <span class="badge badge-soft rounded-pill">Stability rule</span>
                keep querying until a number repeats; the repeated value is selected.
              </div>
              <div class="mb-2">
                <span class="badge badge-soft rounded-pill">Error rule</span>
                if response contains <span class="mono">All time - ...</span>, stop and report no result / erroneous query.
              </div>
              <div>
                <span class="badge badge-soft rounded-pill">Cancel</span>
                aborts the active request and stops the whole process immediately.
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

            <div class="mb-2 text-muted" id="statusLine">Ready.</div>

            <div class="progress mb-3" style="height: 18px;">
              <div id="progressBar" class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%"></div>
            </div>

            <div class="row g-2 mb-3">
              <div class="col-md-4">
                <div class="p-3 rounded-3" style="background: rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);">
                  <div class="text-muted small">Length (settled)</div>
                  <div class="fs-4 mono" id="lenValue">—</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 rounded-3" style="background: rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);">
                  <div class="text-muted small">Char position</div>
                  <div class="fs-4 mono" id="charPosValue">—</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 rounded-3" style="background: rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);">
                  <div class="text-muted small">Statement so far</div>
                  <div class="fs-4 mono" id="soFarValue">—</div>
                </div>
              </div>
            </div>

            <div class="mb-2 d-flex justify-content-between align-items-center">
              <div class="text-muted small">Live log</div>
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
    let activeXhr = null;

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

    // Parses your formats:
    // - success: "result:14"
    // - error/no result: contains "All time - ..."
    function parseResponseText(raw) {
      const t = String(raw || "").trim();
      if (!t) return { ok:false, reason:"Empty response", value:null, raw:t };

      if (t.toLowerCase().includes("all time -")) {
        return { ok:false, reason:"No result found or query erroneous", value:null, raw:t };
      }

      const m = t.match(/result\s*:\s*(-?\d+)/i);
      if (m) return { ok:true, reason:null, value: parseInt(m[1],10), raw:t };

      return { ok:false, reason:"Unrecognized response format", value:null, raw:t };
    }

    function makeFormData({action, charpos, command, sleepVal}) {
      const fd = new FormData();
      fd.append("ptype", "2");
      fd.append("target", "1");
      fd.append("action", action);       // "length" or "char"
      fd.append("finder", "1");
      fd.append("sleep", String(sleepVal));
      fd.append("charpos", charpos === null ? "" : String(charpos));
      fd.append("param", command);
      return fd;
    }

    function postToGameLab({endpoint, action, charpos, command, sleepVal}) {
      // We DO NOT set Cookie headers. Browser sends session cookies automatically for same-origin requests.
      if (activeXhr) { try { activeXhr.abort(); } catch(e) {} }

      return new Promise((resolve, reject) => {
        activeXhr = $.ajax({
          url: endpoint,
          method: "POST",
          data: makeFormData({action, charpos, command, sleepVal}),
          processData: false,
          contentType: false,
          dataType: "text",
          timeout: 60000
        })
        .done((raw) => resolve(raw))
        .fail((xhr, status, err) => {
          if (status === "abort") return reject(new Error("Request aborted"));
          reject(new Error("Request failed: " + (err || status)));
        });
      });
    }

    async function settleNumber({label, probeFn, delayMs}) {
      // your rule: keep querying until a previously returned number repeats
      const seen = new Map(); // val->count
      let attempt = 0;

      while (true) {
        if (cancelled) throw new Error("Cancelled");

        attempt++;
        ui.setStatus(`${label}: probing (attempt ${attempt})...`);
        ui.log(`${label} attempt ${attempt}`);

        const raw = await probeFn();
        ui.log(`Raw: ${raw}`);

        const parsed = parseResponseText(raw);

        if (!parsed.ok) {
          ui.log(`❌ ${label}: ${parsed.reason}. Stopping.`);
          throw new Error(`${label}: ${parsed.reason}`);
        }

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

      if (!command.startsWith("(") || !command.endsWith(")")) {
        ui.setPhase("Error", "text-bg-danger");
        ui.setStatus("Command must be wrapped in brackets, e.g. (run.country2president)");
        ui.enableRun(false);
        return;
      }

      ui.log(`Starting. endpoint=${endpoint}, command=${command}, sleep=${sleepVal}`);

      try {
        // PART 1: settle length
        ui.setPhase("Length", "text-bg-primary");
        const length = await settleNumber({
          label: "Length",
          delayMs,
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

        // PART 2: settle each char codepoint, build statement
        ui.setPhase("Chars", "text-bg-warning");
        ui.setStatus(`Length settled: ${length}. Building...`);

        let built = "";

        for (let pos = 1; pos <= length; pos++) {
          if (cancelled) throw new Error("Cancelled");

          ui.setPos(pos);
          ui.setSoFar(built || "…");
          ui.setProgress(Math.floor(((pos - 1) / length) * 100));
          ui.log(`--- Char ${pos}/${length} ---`);

          const codepoint = await settleNumber({
            label: `Char(${pos})`,
            delayMs,
            probeFn: () => postToGameLab({endpoint, action:"char", charpos:pos, command, sleepVal})
          });

          // Convert numeric unicode to actual character
          let ch = "";
          try {
            ch = String.fromCodePoint(codepoint);
          } catch (e) {
            ui.log(`❌ Invalid codepoint ${codepoint} at pos ${pos}. Stopping.`);
            throw new Error(`Invalid unicode codepoint ${codepoint} at charpos ${pos}`);
          }

          built += ch;

          ui.log(`✅ Char(${pos}) => ${codepoint} => "${ch}"`);
          ui.setSoFar(built);
          ui.setProgress(Math.floor((pos / length) * 100));
        }

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
        activeXhr = null;
      }
    }

    $("#btnStart").on("click", () => runTask());

    $("#btnCancel").on("click", () => {
      cancelled = true;
      ui.log("Cancel requested.");
      ui.setStatus("Cancelling...");
      if (activeXhr) { try { activeXhr.abort(); } catch(e) {} }
    });

    $("#btnReset").on("click", () => {
      cancelled = true;
      if (activeXhr) { try { activeXhr.abort(); } catch(e) {} }
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
