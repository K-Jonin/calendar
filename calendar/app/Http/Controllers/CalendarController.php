<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
	/**
	 * 全てのタスクを取得
	 *
	 * @return void
	 */
	public function GetItemAll()
	{
		try {
			$tasks = Task::all();
			return response()->json($tasks, 200);
		} catch (Exception $ex) {
			return response()->json($ex->getMessage(), 500);
		}
	}

	/**
	 * 日にちからタスクを取得
	 *
	 * @param [string] $date
	 * @return void
	 */
	public function GetTaskByDate($date)
	{
		try {
			$tasks = Task::where("task_date", (string)$date)->get();
			return $tasks;
		} catch (Exception $ex) {
			return response()->json($ex, 500);
		}
	}

	/**
	 * タスクの登録
	 *
	 * @param Request $req
	 * @return void
	 */
	public function Register(Request $req)
	{
		try {
			$task = Task::create($req->all());
			return response()->json($task, 201);
		} catch (Exception $ex) {
			return response()->json($ex->getMessage(), 500);
		}
	}

	/**
	 * タスクの更新
	 *
	 * @param Request $req
	 * @param [string] $id
	 * @return void
	 */
	public function Update(Request $req, $id)
	{
		try {
			$task = Task::find($id);
			if (isset($task)) {
				$task->fill($req->all())->save();
				return response()->json($task, 200);
			} else {
				return response()->json("タスクが取得できません", 403);
			}
		} catch (Exception $ex) {
			return request()->json($ex, 500);
		}
	}

	/**
	 * タスクの削除
	 *
	 * @param Request $req
	 * @param [string] $id
	 * @return void
	 */
	public function Delete(Request $req, $id)
	{
		try {
			$task = Task::find($id);
			if (isset($task)) {
				$task->delete();
				return response()->json($task, 200);
			} else {
				return response()->json("タスクが取得できません", 403);
			}
		} catch (Exception $ex) {
			return request()->json($ex, 500);
		}
	}
}
