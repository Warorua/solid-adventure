<?php
	define('PREPEND_PATH', '');
	include_once(__DIR__ . '/lib.php');

	// accept a record as an assoc array, return transformed row ready to insert to table
	$transformFunctions = [
		'bypass' => function($data, $options = []) {

			return $data;
		},
		'clients' => function($data, $options = []) {
			if(isset($data['created_at'])) $data['created_at'] = guessMySQLDateTime($data['created_at']);

			return $data;
		},
		'math' => function($data, $options = []) {
			if(isset($data['created_at'])) $data['created_at'] = guessMySQLDateTime($data['created_at']);
			if(isset($data['client'])) $data['client'] = pkGivenLookupText($data['client'], 'math', 'client');

			return $data;
		},
		'token' => function($data, $options = []) {

			return $data;
		},
	];

	// accept a record as an assoc array, return a boolean indicating whether to import or skip record
	$filterFunctions = [
		'bypass' => function($data, $options = []) { return true; },
		'clients' => function($data, $options = []) { return true; },
		'math' => function($data, $options = []) { return true; },
		'token' => function($data, $options = []) { return true; },
	];

	/*
	Hook file for overwriting/amending $transformFunctions and $filterFunctions:
	hooks/import-csv.php
	If found, it's included below

	The way this works is by either completely overwriting any of the above 2 arrays,
	or, more commonly, overwriting a single function, for example:
		$transformFunctions['tablename'] = function($data, $options = []) {
			// new definition here
			// then you must return transformed data
			return $data;
		};

	Another scenario is transforming a specific field and leaving other fields to the default
	transformation. One possible way of doing this is to store the original transformation function
	in GLOBALS array, calling it inside the custom transformation function, then modifying the
	specific field:
		$GLOBALS['originalTransformationFunction'] = $transformFunctions['tablename'];
		$transformFunctions['tablename'] = function($data, $options = []) {
			$data = call_user_func_array($GLOBALS['originalTransformationFunction'], [$data, $options]);
			$data['fieldname'] = 'transformed value';
			return $data;
		};
	*/

	@include(__DIR__ . '/hooks/import-csv.php');

	$ui = new CSVImportUI($transformFunctions, $filterFunctions);
