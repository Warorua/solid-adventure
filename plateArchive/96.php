<?php
include './includes/core2.php';

class SQLiteDatabase
{
    private $dbFile = 'database/newCarPlate.db';
    protected $conn;

    public function open()
    {
        try {
            $this->conn = new SQLite3($this->dbFile);
            return $this->conn;
        } catch (Exception $e) {
            echo "There is some problem in connection: " . $e->getMessage();
        }
    }

    public function close()
    {
        $this->conn->close();
    }

    public function insert($tableName, $data)
    {
        try {
            $this->open();

            // Construct the SQL query
            $fields = implode(', ', array_keys($data));
            $placeholders = ':' . implode(', :', array_keys($data));
            $sql = "INSERT INTO $tableName ($fields) VALUES ($placeholders)";

            // Prepare the query
            $stmt = $this->conn->prepare($sql);

            // Bind parameters by reference
            foreach ($data as $key => &$value) {
                $stmt->bindParam(':' . $key, $value);
            }

            // Execute the query
            $stmt->execute();

            return true; // Successful insertion
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed insertion
        } finally {
            $this->close();
        }
    }


    public function select($tableName, $columns = "*", $conditions = "")
    {
        try {
            $this->open();

            // Construct the SQL query
            $sql = "SELECT $columns FROM $tableName";
            if (!empty($conditions)) {
                $sql .= " WHERE $conditions";
            }

            // Execute the query
            $result = $this->conn->query($sql);

            if ($result) {
                $data = array();
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return false; // Query failed
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed to retrieve data
        } finally {
            $this->close();
        }
    }

    public function update($tableName, $data, $conditions)
    {
        try {
            $this->open();

            // Construct the SQL query
            $updateFields = array();
            foreach ($data as $key => $value) {
                $updateFields[] = "$key = :$key";
            }
            $setClause = implode(', ', $updateFields);
            $sql = "UPDATE $tableName SET $setClause WHERE $conditions";

            // Prepare the query
            $stmt = $this->conn->prepare($sql);

            // Bind parameters by reference
            foreach ($data as $key => &$value) {
                $stmt->bindParam(':' . $key, $value);
            }

            // Execute the query
            $stmt->execute();

            return true; // Successful update
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed update
        } finally {
            $this->close();
        }
    }

    public function delete($tableName, $conditions)
    {
        try {
            $this->open();

            // Construct the SQL query
            $sql = "DELETE FROM $tableName WHERE $conditions";

            // Prepare the query
            $stmt = $this->conn->prepare($sql);

            // Execute the query
            $stmt->execute();

            return true; // Successful deletion
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed deletion
        } finally {
            $this->close();
        }
    }

    public function countColumns($tableName)
    {
        try {
            $this->open();

            // Query to retrieve column information
            $sql = "PRAGMA table_info($tableName)";

            // Execute the query
            $result = $this->conn->query($sql);

            if ($result) {
                // Count the number of columns
                $columnCount = $result->numColumns();

                return $columnCount;
            } else {
                return false; // Table or query failed
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed to retrieve column count
        } finally {
            $this->close();
        }
    }

    public function countColumnsWithCondition($tableName, $targetColumn, $condition)
    {
        try {
            $this->open();

            // Construct the SQL query to count the columns where the condition is met
            $sql = "SELECT COUNT(*) FROM $tableName WHERE $condition";

            // Execute the query
            $result = $this->conn->querySingle($sql);

            if ($result !== false) {
                return $result; // Return the count
            } else {
                return 0; // No columns matched the condition
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false; // Failed to retrieve column count
        } finally {
            $this->close();
        }
    }
}

$sqliteDB = new SQLiteDatabase();

/*
////////COUNT EMPTY COLUMNS
// Specify the table name
$tableName = 'plateData';

// Specify the target column and condition
$targetColumn = '*';
$condition = "ntsa IS NULL OR ntsa = ''"; // Replace with your condition

// Call the countColumnsWithCondition method
$columnCount = $sqliteDB->countColumnsWithCondition($tableName, $targetColumn, $condition);

if ($columnCount !== false) {
    echo "Number of columns in $tableName where $targetColumn meets the condition: $columnCount";
} else {
    echo "Failed to retrieve column count.";
}
*/
function updatedata()
{
    $sqliteDB = new SQLiteDatabase();
}
// Specify the table name
$tableName = 'plateData';

// Define the columns you want to select (default is "*")
$columns = "plate, ntsa";

// Define any conditions (optional)
$conditions = "ntsa IS NULL AND error IS NULL ORDER BY RANDOM() LIMIT 10";

// Call the select method
$data = $sqliteDB->select($tableName, $columns, $conditions);

if ($data !== false) {
    // Data retrieval successful
    //print_r($data);
    foreach ($data as $row) {
        //echo $row['plate'] . PHP_EOL;
        $url = 'https://nairobiservices.go.ke/api/iprs/parking/ntsa/vehicle/' . $row['plate'];
        $dt1 = json_decode(httpGet($url, []), true);
        if (is_array($dt1)) {
            if (isset($dt1['data'])) {
                echo $dt1['data']['owner_name'] . ' | ' . $dt1['data']['mobile_number'] . ' | ' . $dt1['data']['vehicle_no'] . '<br/>';
                // Specify the table name
                $tableName = 'plateData';

                //*
                // Data to update
                $dataToUpdate = array(
                    'ntsa' => $dt1['data']['ntsa'],
                    'id_number' => $dt1['data']['id_number'],
                    'owner_name' => $dt1['data']['owner_name'],
                    'passport_no' => $dt1['data']['passport_no'],
                    'pin' => $dt1['data']['pin'],
                    'email_id' => $dt1['data']['email_id'],
                    'mobile_number' => $dt1['data']['mobile_number'],
                    'vehicle_model' => $dt1['data']['vehicle_model'],
                    'use' => $dt1['data']['use'],
                    'purpose' => $dt1['data']['purpose'],
                    'capacity' => $dt1['data']['capacity'],
                    // Add more columns and values as needed
                );
                //*/
                //$dataToUpdate = $dt1['data'];

                // Define the conditions for updating
                $conditions = "plate = '".$row['plate']."'";

                // Call the update method
                if ($sqliteDB->update($tableName, $dataToUpdate, $conditions)) {
                    echo "Data updated successfully.";
                } else {
                    echo "Failed to update data.";
                }
            } elseif (isset($dt1['error'])) {
                echo $dt1['error'] . '<br/>';
                // Specify the table name
                $tableName = 'plateData';

                //*
                // Data to update
                $dataToUpdate = array(
                    'error' => $dt1['error'],
                    // Add more columns and values as needed
                );
                //*/

                // Define the conditions for updating
                $conditions = "plate = '".$row['plate']."'";

                // Call the update method
                if ($sqliteDB->update($tableName, $dataToUpdate, $conditions)) {
                    echo "Data updated successfully.";
                } else {
                    echo "Failed to update data.";
                }
            }
        }
    }
} else {
    // Data retrieval failed
    echo "Failed to retrieve data.";
}
