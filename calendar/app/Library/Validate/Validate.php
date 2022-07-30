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
		$error_mess = [
			"title" => ["msg" => "", "exists" => false],
			"desc" => ["msg" => "", "exists" => false],
			"start_time" => ["msg" => "", "exists" => false],
			"finish_time" => ["msg" => "", "exists" => false],
		];

		// タイトル
		if (empty($reqAll["title"])) {
			$error_mess["title"]["msg"] = "タイトルが未入力です";
			$error_mess["title"]["exists"] = true;
		} elseif (20 < mb_strlen($reqAll["title"])) {
			$error_mess["title"]["msg"] = "タイトルは20文字以内で入力してください";
			$error_mess["title"]["exists"] = true;
		}

		// タスク説明
		if (!empty($reqAll["desc"])) {
			$error_mess["desc"]["msg"] = 255 < mb_strlen($reqAll["desc"]) ? "説明は255文字以内で入力してください" : "";
			$error_mess["desc"]["exists"] = true;
		}

		// 開始時刻
		if (!empty($reqAll["start_time"])) {
			$error_mess["start_time"]["msg"] = Validate::VaridateTime($reqAll["start_time"]);
			$error_mess["start_time"]["exists"] = true;
		}

		// 終了時刻
		if (!empty($reqAll["finish_time"])) {
			$error_mess["finish_time"]["msg"] = Validate::VaridateTime($reqAll["finish_time"]);
			$error_mess["finish_time"]["exists"] = true;
		}

		// 時刻設定の整合性チェック
		if (
			!empty($reqAll["start_time"])
			&& !empty($reqAll["finish_time"])
			&& empty($error_mess["start_time"]["msg"])
			&& empty($error_mess["finish_time"]["msg"])
		) {
			$start_time = new DateTime($reqAll["start_time"]);
			$finish_time = new DateTime($reqAll["finish_time"]);

			if ($finish_time < $start_time) {
				$error_mess["finish_time"]["msg"] = "開始時刻以降に終了時刻を設定して下さい";
				$error_mess["finish_time"]["exists"] = true;
			}
		}

		return $error_mess;
	}

	/**
	 * 時間形式のバリデーション
	 *
	 * @param [type] $input
	 * @return string エラーメッセージ
	 */
	private function VaridateTime($input)
	{
		$ex_time = explode(":", $input);
		if (count($ex_time) != 2) {
			return "正しい形式で入力してください。例) 00:00";
		} elseif (
			!preg_match("/[0-1][0-9]|2[0-4]/", (string)$ex_time[0])
			|| !preg_match("/[0-5][0-9]|60/", $ex_time[1])
		) {
			return "正しい時刻を入力してください。例) 00:00";
		}

		return "";
	}
}
