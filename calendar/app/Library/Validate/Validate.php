<?php

namespace App\Library\Validate;

use DateTime;

class Validate
{
	/**
	 * タスクフォームのバリデーション
	 *
	 * @param [Array] $reqAll
	 * @return Array エラーメッセージ
	 */
	static public function ValidateTaskInput($reqAll)
	{
		// エラーメッセージ
		$error_mess = [
			"isExistsError" => false,
			"title" => ["msg" => "", "exists" => false],
			"desc" => ["msg" => "", "exists" => false],
			"start_time" => ["msg" => "", "exists" => false],
			"finish_time" => ["msg" => "", "exists" => false],
		];

		// タイトル
		if (empty($reqAll["title"])) {
			$error_mess["title"]["msg"] = "タイトルが未入力です";
			$error_mess["title"]["exists"] = true;
		} elseif (20 < mb_strlen(trim($reqAll["title"]))) {
			$error_mess["title"]["msg"] = "タイトルは20文字以内で入力してください";
			$error_mess["title"]["exists"] = true;
		}

		// タスク説明
		if (!empty($reqAll["desc"])) {
			if (255 < mb_strlen(trim($reqAll["desc"]))) {
				$error_mess["desc"]["msg"] = "説明は255文字以内で入力してください";
				$error_mess["desc"]["exists"] = true;
			}
		}

		// 開始時刻
		if (!empty($reqAll["start_time"])) {
			if (!preg_match("/^([01][0-9]|2[0-3]):[0-5][0-9]$/", trim($reqAll["start_time"]))) {
				$error_mess["start_time"]["msg"] = "正しい形式で入力してください。例) 00:00";
				$error_mess["start_time"]["exists"] = true;
			}
		}

		// 終了時刻
		if (!empty($reqAll["finish_time"])) {
			if (!preg_match("/^([01][0-9]|2[0-3]):[0-5][0-9]$/", trim($reqAll["finish_time"]))) {
				$error_mess["finish_time"]["msg"] = "正しい形式で入力してください。例) 00:00";
				$error_mess["finish_time"]["exists"] = true;
			}
		}

		// 時刻設定の整合性チェック
		if (
			!empty($reqAll["start_time"])
			&& !empty($reqAll["finish_time"])
			&& empty($error_mess["start_time"]["msg"])
			&& empty($error_mess["finish_time"]["msg"])
			&& !$error_mess["start_time"]["exists"]
			&& !$error_mess["finish_time"]["exists"]
		) {
			$start_time = new DateTime($reqAll["start_time"]);
			$finish_time = new DateTime($reqAll["finish_time"]);

			if ($finish_time < $start_time) {
				$error_mess["finish_time"]["msg"] = "開始時刻以降に終了時刻を設定して下さい";
				$error_mess["finish_time"]["exists"] = true;
			}
		}

		// エラーが存在するか
		if (
			$error_mess["title"]["exists"]
			|| $error_mess["desc"]["exists"]
			|| $error_mess["start_time"]["exists"]
			|| $error_mess["finish_time"]["exists"]
		) {
			$error_mess["isExistsError"] = true;
		}

		return $error_mess;
	}
}
