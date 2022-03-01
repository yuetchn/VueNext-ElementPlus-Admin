/*
 * @ModuleName: Validations
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-01 13:17:49
 */

/** 邮箱验证 */
const Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

/** 域名验证 */
const Domain = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;

/** URL 验证 */
const Url = /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

/** 手机号验证 */
const Mobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;

/** 身份证验证 */
const IdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

/** Ipv4 地址验证 */
const Ipv4 = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/;

/** 账号验证: 字母、数字、下划线 */
const Account = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;

export class NewVerify {
  public validator!: Function;

  constructor(reg?: RegExp, error = "格式错误") {
    this.validator = (r: any, v: any, call: any) => (reg?.test(v) ? call() : call(new Error(error)));
  }

  private createValidator(reg: RegExp, error: string) {
    return (r: any, v: any, call: any) => (reg.test(v) ? call() : call(new Error(error)));
  }

  /** 邮箱验证 */
  public Email(error = "邮箱格式错误") {
    return this.createValidator(Email, error);
  }

  /** 域名验证 */
  public Domain(error = "域名格式错误") {
    return this.createValidator(Domain, error);
  }

  /** Url验证 */
  public Url(error = "Url格式错误") {
    return this.createValidator(Url, error);
  }

  /** 手机号验证 */
  public Mobile(error = "手机号格式错误") {
    return this.createValidator(Mobile, error);
  }

  /** 身份证号验证 */
  public IdCard(error = "身份证号格式错误") {
    return this.createValidator(IdCard, error);
  }

  /** Ipv4验证 */
  public Ipv4(error = "Ipv4格式错误") {
    return this.createValidator(Ipv4, error);
  }

  /** 账号验证 */
  public Account(error = "账号格式错误") {
    return this.createValidator(Account, error);
  }
}

export default {
  Email,
  Domain,
  Url,
  Mobile,
  IdCard,
  Ipv4,
  Account,
};
