<?php
function dbFile($filename){
 if(file_exists($filename)){
    return $filename;
 }else{
    die('Database file not found');
 }
}
class SQLiteDatabase
{
    private $dbFile = 'database/nationPersons.db';
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

            // Construct the SQL query to retrieve the specified column data
            $sql = "SELECT $targetColumn FROM $tableName WHERE $condition";

            // Execute the query
            $result = $this->conn->query($sql);

            if ($result) {
                // Get the number of columns in the result set
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
}
