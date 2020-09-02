const functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp();

const auth = admin.auth();

const UNSUPPORTED_METHOD = {
    data: {
        status: "error",
        code: "UNSUPPORTED_METHOD"
    }
}

exports.login = functions.https.onRequest(async (req, res) => {
    switch (req.method) {
        case "GET":
            res.json(UNSUPPORTED_METHOD)
            break
        case "POST":
            try {
                await auth.signInWithEmailAndPassword(req.body.email, req.body.password)
                res.json({
                    data: {
                        status: "success",
                        code: "LOGIN_SUCCESS"
                    }
                })
            } catch (e) {
                res.json({
                    data: {
                        status: "error",
                        code: e
                    }
                })
            }
            break
        default:
            res.json(UNSUPPORTED_METHOD)
            break
    }
});