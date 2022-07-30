/*
 * @ModuleName: 
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-26 14:59:22
 */
import { IRequestPageInfo } from "@base"
import req from "@/utils/request"
/**
 * 获取所有菜单Tree
 * @returns 
 */
export const GetAllMenuTree = () => req.Get(GetAllMenuTree_API)
export const GetAllMenuTree_API = "/v1/menu/getAllMenuTree"

/**
 * 新增/修改菜单信息
 * @param data 
 * @returns 
 */
export const SaveOrUpdate = (data:any) => req.Post(SaveOrUpdate_API, data)
export const SaveOrUpdate_API = "/v1/menu/saveOrUpdate"

/**
 * 获取菜单详情
 * @param id 
 * @returns 
 */
export const GetMenuByID = (id: number) => req.Get(GetMenuByID_API, { id })
export const GetMenuByID_API = "/v1/menu/getMenuById"

/**
 * 删除菜单
 * @param id 
 * @returns 
 */
export const DeleteMenuByID = (id: number) => req.Delete(DeleteMenuByID_API, { id })
export const DeleteMenuByID_API = "/v1/menu/deleteMenuById"

/**
 * 批量删除菜单
 * @param id 
 * @returns 
 */
export const DeleteMenuByIDS = (ids: number[]) => req.Delete(DeleteMenuByIDS_API, null, { data: { ids } })
export const DeleteMenuByIDS_API = "/v1/menu/deleteMenuByIds"

/**
 * 获取菜单按钮列表 - 分页
 * @param page 
 * @returns 
 */
export const GetMenuBtnByPage = <T>(page:IRequestPageInfo<T>) => req.Post(GetMenuBtnByPage_API, page)
export const GetMenuBtnByPage_API = "/v1/menu/getMenuBtnByPage"

/**
 * 新增/修改菜单按钮
 * @param data 
 * @returns 
 */
export const SaveOrUpdateBtn = (data: any) => req.Post(SaveOrUpdateBtn_API, data)
export const SaveOrUpdateBtn_API = "/v1/menu/saveOrUpdateBtn"

/**
 * 删除菜单按钮
 * @param id 
 * @returns 
 */
export const DeleteBtnByID = (id: number) => req.Delete(DeleteBtnByID_API, { id })
export const DeleteBtnByID_API = "/v1/menu/deleteBtnById"