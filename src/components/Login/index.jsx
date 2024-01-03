import styled from "styled-components";

import firebase, { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";

const fbProvider = new firebase.auth.FacebookAuthProvider();

const LoginStyled = styled.div`
    width: 25%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .log-heading {
        text-align: center;
    }

    .log-btn {
        background-color: #e2e8f0;
        margin-top: 12px;
        padding: 8px;
        border-radius: 16px;
        font-weight: bold;
        cursor: pointer;
    }

    .log-btn:hover {
        color: white;
        background-color: #4b5563;
    }
`;

function Login() {
    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);

        if (additionalUserInfo?.isNewUser) {
            console.log(additionalUserInfo);
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName.toLowerCase()),
            });
        }
    };

    return (
        <LoginStyled>
            <h1 className="log-heading">Fun Chat</h1>
            <button className="log-btn">Đăng nhập bằng Google</button>
            <button className="log-btn" onClick={handleFbLogin}>
                Đăng nhập bằng Facebook
            </button>
        </LoginStyled>
    );
}

export default Login;
