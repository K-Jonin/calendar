import React, { useRef, useState } from "react";
import axios from "axios";

export default function TaskForm({
    isVisibleTaskForm,
    setIsVisibleTaskForm,
    generalDate,
}) {
    // エラーが存在するか
    let [isExistsError, setIsExistsError] = useState(false);

    // エラーメッセージを格納
    const [errorMessage, setErrorMessage] = useState({
        title: "",
        desc: "",
        start_time: "",
        finish_time: "",
    });

    // ポスト送信するデータを格納
    const [postData, setPostData] = useState({
        title: "",
        desc: "",
        start_time: "",
        finish_time: "",
        task_date: generalDate,
    });

    // インプットの値が変化する度に更新
    const handleChangeInput = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
        if (isExistsError) {
            setIsExistsError(validate(e.target.name, e.target.value));
        }
    };

    // 登録ボタンを押下
    const handleSubmit = async (e) => {
        e.preventDefault();
        // APi通信
        try {
            const result = await axios.post("/api/calendar/register", postData);
            switch (result.status) {
                case 201:
                    window.location.reload();
                    isExistsError = false;
                    break;
                case 202:
                    console.log(postData);
                    setErrorMessage(result.data);
                    setIsExistsError(true);
                    break;
                case 500:
                    console.log("ERROR");
                    break;
            }
        } catch (err) {
            console.log(err);
        }
    };

    // クリックで非表示
    const clickInvisible = () => {
        setIsVisibleTaskForm(false);
    };

    return (
        <div
            className={`taskForm ${
                isVisibleTaskForm ? "visible" : "invisible"
            }`}
        >
            <div className="bgDark" onClick={clickInvisible}></div>
            <form className="taskFormWrapper" onSubmit={(e) => handleSubmit(e)}>
                <button
                    type="button"
                    onClick={clickInvisible}
                    className="closeButton"
                >
                    ｘ
                </button>
                <p className="title">
                    <label>タイトル</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="タイトルを入力"
                        className={isExistsError ? "error" : ""}
                        onChange={(e) => handleChangeInput(e)}
                    />
                    <span className="errorMessage">{errorMessage.title}</span>
                </p>
                <p className="disc">
                    <label>説明</label>
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        onChange={(e) => handleChangeInput(e)}
                        className={isExistsError ? "error" : ""}
                    ></textarea>
                    <span className="errorMessage">{errorMessage.desc}</span>
                </p>
                <p>
                    <label>開始時刻</label>
                    <input
                        type="text"
                        name="start_time"
                        placeholder="例）00:00"
                        onChange={(e) => handleChangeInput(e)}
                        className={isExistsError ? "error" : ""}
                    />
                    <span className="errorMessage">
                        {errorMessage.start_time}
                    </span>
                </p>
                <p>
                    <label>終了時刻</label>
                    <input
                        type="text"
                        name="finish_time"
                        placeholder="例）00:00"
                        onChange={(e) => handleChangeInput(e)}
                        className={isExistsError ? "error" : ""}
                    />
                    <span className="errorMessage">
                        {errorMessage.finish_time}
                    </span>
                </p>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}

/**
 * エラー表示用の簡単なバリデーション
 *
 */
function validate(targetName, targetValue) {
    switch (targetName) {
        case "title":
            if (targetValue.length < 1) {
                return true;
            }
        default:
            return false;
    }
}
