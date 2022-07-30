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
			"title" => "",
			"desc" => "",
			"start_time" => "",
			"finish_time" => "",
		];

		// タイトル
		if (empty($reqAll["title"])) {
			$error_mess["title"] = "タイトルが未入力です";
		} elseif (20 < mb_strlen($reqAll["title"])) {
			$error_mess["title"] = "タイトルは20文字以内で入力してください";
		}

		// タスク説明
		if (!empty($reqAll["desc"])) {
			$error_mess["desc"] = 255 < mb_strlen($reqAll["desc"]) ? "説明は255文字以内で入力してください" : "";
		}

		// 開始時刻
		if (!empty($reqAll["start_time"])) {
			$error_mess["start_time"] = Validate::VaridateTime($reqAll["start_time"]);
		}

		// 終了時刻
		if (!empty($reqAll["finish_time"])) {
			$error_mess["finish_time"] = Validate::VaridateTime($reqAll["finish_time"]);
		}

		// 時刻設定の整合性チェック
		if (
			!empty($reqAll["start_time"])
			&& !empty($reqAll["finish_time"])
			&& empty($error_mess["start_time"])
			&& empty($error_mess["finish_time"])
		) {
			$start_time = new DateTime($reqAll["start_time"]);
			$finish_time = new DateTime($reqAll["finish_time"]);

			if ($finish_time < $start_time) {
				$error_mess["finish_time"] = "開始時刻以降に終了時刻を設定して下さい";
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
