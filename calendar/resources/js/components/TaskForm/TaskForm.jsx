import React, { useState } from "react";
import axios from "axios";

export default function TaskForm({
    isVisibleTaskForm,
    setIsVisibleTaskForm,
    postData,
    setPostData,
}) {
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

    // 登録またはボタンを押下
    const handleSubmit = async (e) => {
        e.preventDefault();
        // APi通信
        let result = null;
        switch (e.currentTarget.name) {
            case "btnInsertUpdate":
                if (isVisibleTaskForm.isEdit) {
                    // 更新
                    result = await axios.put(
                        `/api/calendar/update/${postData.id}`,
                        postData
                    );
                } else {
                    // 登録
                    result = await axios.post(
                        "/api/calendar/register",
                        postData
                    );
                }
                break;

            case "btnDelete":
                // 削除
                result = await axios.put(`/api/calendar/delete/${postData.id}`);
                break;

            default:
                throw "ERROR";
        }

        switch (result.status) {
            case 200:
            case 201:
                localStorage.setItem("generalDate", postData.task_date);
                window.location.reload();
                break;
            case 202:
                setErrorMessage(result.data);
                break;
            case 403:
                console.log(result.data);
            case 500:
                console.log("ERROR");
                break;
        }
        try {
        } catch (err) {
            console.log(err);
        }
    };

    // クリックで非表示
    const clickInvisible = () => {
        setIsVisibleTaskForm({
            ...isVisibleTaskForm,
            visible: false,
            isEdit: false,
        });
        setPostData(initiarizeObject(postData));
        setErrorMessage(initiarizeObjectForErrorMessage(errorMessage));
    };

    return (
        <div
            className={`taskForm ${
                isVisibleTaskForm.visible ? "visible" : "invisible"
            }`}
        >
            <div className="bgDark" onClick={clickInvisible}></div>
            <form className="taskFormWrapper">
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
                        value={postData.title ? postData.title : ""}
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
                        value={postData.desc ? postData.desc : ""}
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
                        value={postData.start_time ? postData.start_time : ""}
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
                        value={postData.finish_time ? postData.finish_time : ""}
                        className={
                            errorMessage.finish_time.exists ? "error" : ""
                        }
                    />
                    <span className="errorMessage">
                        {errorMessage.finish_time.msg}
                    </span>
                </p>
                <button
                    type="submit"
                    name="btnInsertUpdate"
                    onClick={(e) => handleSubmit(e)}
                >
                    {isVisibleTaskForm.isEdit ? "更新" : "登録"}
                </button>
                {isVisibleTaskForm.isEdit && (
                    <button
                        type="submit"
                        name="btnDelete"
                        onClick={(e) => handleSubmit(e)}
                    >
                        削除
                    </button>
                )}
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
