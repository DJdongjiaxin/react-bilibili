import * as React from "react";
import "./feedback.css";
import { addFeedback } from "../../api/up-user";

const Feedback = () => {
    const [feedback, setFeedback] = React.useState("");
    const getResult = () => {
        addFeedback(feedback, JSON.parse(localStorage.getItem('eyeUser'))[0].id).then((result) => {
            console.log(JSON.stringify(result) + "####");
            if (result.code === 0) {
                console.log(JSON.stringify(result.data));

            }
        });

    }
    const onSubmitForm = async (e) => {
        e.preventDefault();

        getResult();

    };

    return (
        <div className="container">
            <h1>用户反馈</h1>
            <form onSubmit={onSubmitForm}>
                <div className="form-group">
                    <label htmlFor="feedback">反馈具体内容</label>
                    <input
                        type="text"
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">提交反馈</button>
            </form>
        </div>
    );
};

export default Feedback;