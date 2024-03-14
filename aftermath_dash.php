<?php
include './includes/header.php';
include './includes/conn_pure.php';
?>
        <div class="table-responsive">

            <table id="table_id" class="table display mt-5 pt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th>Length</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $stmt = $conn->prepare("SELECT * FROM aftermath ORDER BY status DESC");
                    $stmt->execute();
                    $am = $stmt->fetchAll();
                    foreach($am as $row){
                        if($row['status'] == '0'){
                            $status = '<div class="badge bg-danger">UNFOUND</div>';
                            $length = 'NULL';
                            $storage = 'EMPTY';
                        }else{
                            $status = '<div class="badge bg-success">FOUND</div>';
                            $length = $row['length'];
                            $storage = '<a href="https://kever.io/'.$row['storage'].'" class="btn btn-success">File Link</a>';
                        }
                        echo '<tr>
                        <td>'.$row['id'].'</td>
                        <td>'.$row['title'].'</td>
                        <td>'.$row['url'].'</td>
                        <td>'.$status.'</td>
                        <td>'.$length.'</td>
                        <td>'.$storage.'</td>
                        </tr>';
                    }
                    ?>
                </tbody>
            </table>
        </div>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>