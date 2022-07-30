import React from "react";

export default function InputTask() {
    const submitTask = () => {
        console.log("送信");
    };

    return (
        <>
            <p className="title">
                <label>タイトル</label>
                <input type="text" name="title" placeholder="タイトルを入力" />
            </p>
            <p className="disc">
                <label>説明</label>
                <textarea name="text" cols="30" rows="10"></textarea>
            </p>
            <p>
                <label>開始時刻</label>
                <input type="text" name="start_time" placeholder="例）00:00" />
            </p>
            <p>
                <label>終了時刻</label>
                <input type="text" name="finish_time" placeholder="例）00:00" />
            </p>
            <button type="button" onClick={() => submitTask()}>
                登録
            </button>
        </>
    );
}
