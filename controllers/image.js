
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '485abd2228bb47e093b1996c0b36d96e';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    // Change these to whatever model and image URL you want to use

    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    // console.log(requestOptions)
    return requestOptions;
}

const handleApiCall = (req, res) => {
    fetch('https://api.clarifai.com/v2/models/face-detection/outputs', returnClarifaiRequestOptions(req.body.input))
        .then(response => response.json())
        .then(data => {
            res.json(data);
        })
        
        .catch(error => res.status(400).json('unable to work with api'))
    
    //     .then((response) => response.text())
    // .then((result) => {
    //   res.json(result);
    // })
    // .catch((err) => res.status(500).json("Unable to communicate with API"));
}

// module.exports = {
//     handleApiCall, handleImage
// }

export default { handleApiCall, handleImage };