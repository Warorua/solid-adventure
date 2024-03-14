<?php
$info = '{
    "has_account": false,
    "erp_account": false,
    "data": {
        "id": 123453,
        "sur_name": "Warorua",
        "first_name": "Ruth",
        "middle_name": "Njeri",
        "email": "RNJERI39@YAHOO.COM",
        "gender": "F",
        "marital_status_cd": null,
        "replication_dt": null,
        "citizenship_code": "KE",
        "alain_identity_number": null,
        "country_of_origin": null,
        "work_permit_number": null,
        "place_of_birth": null,
        "nid_no": "26121480",
        "nid_issue_dt": "16/01/2015",
        "nid_issue_place": null,
        "other_profession": null,
        "passport_no": null,
        "actual_birth_date": "24/05/1987",
        "pin_no": "A008344832R",
        "tax_payer_type": "INDI",
        "tax_payer_name": "Ruth Warorua Njeri",
        "is_agent_authorized": null,
        "active_flag1": "Active",
        "effective_date": "16/01/2015",
        "mobile_number": "0727828772",
        "nrs_mobile_number": null,
        "Lr_number": null,
        "building": "gatanga",
        "street_road": "gatanga road",
        "city_town": "thika",
        "county": "29",
        "district": "17",
        "postal_code": "01000",
        "po_box": "1356",
        "type": "Individual"
    },
    "status": 200
}';
$apiKey = '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';

$gpt4Model = 'gpt-4-turbo-preview'; // Adjust this to the correct GPT-4 model
//$gpt4Prompt = "Analyze the profile of this person from the details in the JSON provided and provide useful insights(make its as brief as possible, 20 words max per insight) that a lending company should consider before loaning the person. Also, provide a brief of what the person might be. Create an analysis on a scale of 1 to 10 across five key factors: Financial Stability, Credit History, Income Predictability, Financial Responsibility, and Risk Level then place it between tags <visual></visual>:".$info; // Example prompt
$gpt4Prompt = 'Analyze the profile of this person from the details in the JSON provided and explain and expound the profile providing extra details where necessary, making it as moderately brief.'.$info;;
// GPT-4 API URL for chat completions
$gpt4Url = 'https://api.openai.com/v1/chat/completions';

// cURL setup for GPT-4
$ch = curl_init($gpt4Url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['model' => $gpt4Model,'max_tokens'=>1000, 'temperature'=>1, 'frequency_penalty'=>0, 'presence_penalty'=>0, 'messages' => [['role' => 'user', 'content' => $gpt4Prompt]]]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Authorization: Bearer ' . $apiKey]);

// Execute GPT-4 request
$response = curl_exec($ch);
curl_close($ch);

// Process GPT-4 response
$responseData = json_decode($response, true);
$gpt4Insight = $responseData['choices'][0]['message']['content'] ?? 'No insight generated.';
echo "GPT-4 Insight: " . $gpt4Insight;

// Proceed to generate a visual with DALL·E based on the GPT-4 insight...
//$dallePrompt = "Illustration of a futuristic urban landscape with skyscrapers powered by solar panels"; // Adjust based on GPT-4 insight
$dallePrompt = "Create Graphical Profile for the insight: ".$gpt4Insight;
// DALL·E API URL
$dalleUrl = 'https://api.openai.com/v1/images/generations';

// cURL setup for DALL·E
$ch = curl_init($dalleUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['model' => 'dall-e-3', 'quality'=>'standard',  'response_format'=>'url', 'style'=>'natural','prompt' => $dallePrompt, 'n' => 1])); // Adjust 'dalle-2' as necessary
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Authorization: Bearer ' . $apiKey]);

// Execute DALL·E request
$response = curl_exec($ch);
curl_close($ch);
echo "<br/><br/>";
// Process DALL·E response
$responseData = json_decode($response, true);
if (isset($responseData['data'][0]['url'])) {
    $dalleImageUrl = $responseData['data'][0]['url'];
    echo "DALL·E Generated Image: <img src='".$dalleImageUrl."' />" . $dalleImageUrl;

} else {
    echo "No image generated.<br/>";
    echo $response;
}

