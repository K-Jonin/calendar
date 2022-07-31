import React, { useState } from "react";
import axios from "axios";

export default function TaskForm({
    isVisibleTaskForm,
    setIsVisibleTaskForm,
    generalDate,
}) {
    // ポスト送信するデータを格納
    const [postData, setPostData] = useState({
        title: "",
        desc: "",
        start_time: "",
        finish_time: "",
        task_date: generalDate,
    });

    // エラーメッセージを格納
    const [errorMessage, setErrorMessage] = useState({
        isExistsError: false,
        title: { msg: "", exists: false },
        desc: { msg: "", exists: false },
        start_time: { msg: "", exists: false },
        finish_time: { msg: "", exists: false },
    });

    // インプットの値が変化する度に更新
    const handleChangeInput = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
        if (errorMessage.isExistsError) {
            setErrorMessage(validate(e.target.name, errorMessage));
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
                    break;
                case 202:
                    setErrorMessage(result.data);
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
        setPostData(initiarizeObject(postData));
        setErrorMessage(initiarizeObjectForErrorMessage(errorMessage));
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
                        className={errorMessage.title.exists ? "error" : ""}
                        onChange={(e) => handleChangeInput(e)}
                        value={postData.title}
                    />
                    <span className="errorMessage">
                        {errorMessage.title.msg}
                    </span>
                </p>
                <p className="disc">
                    <label>説明</label>
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        onChange={(e) => handleChangeInput(e)}
                        className={errorMessage.desc.exists ? "error" : ""}
                    ></textarea>
                    <span className="errorMessage">
                        {errorMessage.desc.msg}
                    </span>
                </p>
                <p>
                    <label>開始時刻</label>
                    <input
                        type="text"
                        name="start_time"
                        placeholder="例）00:00"
                        onChange={(e) => handleChangeInput(e)}
                        className={
                            errorMessage.start_time.exists ? "error" : ""
                        }
                    />
                    <span className="errorMessage">
                        {errorMessage.start_time.msg}
                    </span>
                </p>
                <p>
                    <label>終了時刻</label>
                    <input
                        type="text"
                        name="finish_time"
                        placeholder="例）00:00"
                        onChange={(e) => handleChangeInput(e)}
                        className={
                            errorMessage.finish_time.exists ? "error" : ""
                        }
                    />
                    <span className="errorMessage">
                        {errorMessage.finish_time.msg}
                    </span>
                </p>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}

/**
 * エラー表示後、入力に変更があれば該当フォームのエラー表示を無くす
 * @param {String} targetName 該当フォームの名称
 * @param {Array} errorMessage エラーメッセージ
 * @returns {Array} エラーメッセージ
 */
function validate(targetName, errorMessage) {
    switch (targetName) {
        case "title":
            errorMessage.title.exists = false;
            break;
        case "desc":
            errorMessage.desc.exists = false;
            break;
        case "start_time":
            errorMessage.start_time.exists = false;
            break;
        case "finish_time":
            errorMessage.finish_time.exists = false;
            break;
    }

    if (
        !errorMessage.title.exists &&
        !errorMessage.desc.exists &&
        !errorMessage.start_time.exists &&
        !errorMessage.finish_time.exists
    ) {
        errorMessage.isExistsError = false;
    }
    return errorMessage;
}

/**
 * オブジェクトを初期化
 * @param {Object} object 初期化前のオブジェクト
 * @returns {Object} 初期化されたオブジェクト
 */
function initiarizeObject(object) {
    Object.keys(object).map(
        (key) => (object[key] = key !== "task_date" ? "" : object.task_date)
    );
    return object;
}

/**
 * エラーメッセージオブジェクトを初期化
 * @param {Object} object 初期化前のオブジェクト
 * @returns {Object} 初期化されたオブジェクト
 */
function initiarizeObjectForErrorMessage(object) {
    Object.keys(object).map((key) =>
        key === "isExistsError"
            ? (object.isExistsError = false)
            : Object.keys(object[key]).map(
                  (key2) => (object[key][key2] = key2 === "msg" ? "" : false)
              )
    );
    return object;
}
