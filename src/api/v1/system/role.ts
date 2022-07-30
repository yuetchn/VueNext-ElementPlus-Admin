/*
 * @ModuleName: 角色管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-29 22:56:54
 */
import { IRequestPageInfo } from "@/utils/base"
import req from "@/utils/request"

/**
 * 获取角色集合
 * @param data 
 * @returns 
 */
export const GetRoleByPage = <D>(data:IRequestPageInfo<any>) => req.Post<D>(GetRoleByPage_API, data)
export const GetRoleByPage_API = "/v1/role/getRoleByPage"
/**
 * 新增/修改角色信息
 * @param data 
 * @returns 
 */
export const SaveOrUpdateRole = (data: any) => req.Post(SaveOrUpdateRole_API, data)
export const SaveOrUpdateRole_API = "/v1/role/saveOrUpdateRole"

/**
 * 删除角色
 * @param id 
 * @returns 
 */
export const DeleteRoleByID = (id: number) => req.Delete(DeleteRoleByID_API, { id })
export const DeleteRoleByID_API = "/v1/role/deleteRoleById"

/**
 * 获取角色详情
 * @param id 
 * @returns 
 */
export const GetRoleByID = (id: number) => req.Get(GetRoleByID_API, { id })
export const GetRoleByID_API = "/v1/role/getRoleById"