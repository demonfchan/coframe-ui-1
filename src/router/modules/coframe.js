import FuncCode from '@/permission/FuncCode'
const _import = require('../_import_' + process.env.NODE_ENV)

import Layout from '@/views/layout/Layout'

export default [
  {
    path: '/admin',
    component: Layout,
    group: 'admin',
    redirect: 'noredirect',
    alwaysShow: true,
    funccode: FuncCode.cof_m_org,
    name: 'org-rights',
    meta: {
      title: '组织机构',
      icon: 'org',
    },
    children: [
      {
        path: 'org-position',
        funccode: FuncCode.cof_m_org_tree,
        component: _import('admin/org-position/index'),
        name: 'org-position',
        meta: {
          title: '机构管理',
        },
      },
      {
        path: 'employee',
        funccode: FuncCode.cof_m_emp,
        component: _import('admin/org-position/member-management/index'),
        name: 'employee',
        meta: {
          title: '人员管理',
        },
      },
    ],
  },
  {
    path: '/authority',
    funccode: FuncCode.cof_m_auth,
    component: Layout,
    group: 'admin',
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'authority',
    meta: {
      title: '权限管理',
      icon: 'right',
    },
    children: [
      {
        path: 'role',
        funccode: FuncCode.cof_m_member,
        component: _import('admin/org-auth/index'),
        name: 'role',
        meta: {
          title: '成员角色',
        },
      },
      {
        path: 'user',
        funccode: FuncCode.cof_m_user,
        component: _import('admin/org-auth/user/index'),
        name: 'user-index',
        meta: {
          title: '用户管理',
        },
      },
    ],
  },
  {
    path: '/system-config',
    component: Layout,
    funccode: FuncCode.cof_m_sys,
    group: 'admin',
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'system-config',
    meta: {
      title: '系统配置',
      icon: 'my-security',
    },
    children: [
      {
        path: 'authority-template',
        funccode: FuncCode.cof_m_role_template,
        component: _import('admin/system/role-template/index'),
        name: 'authority-template',
        // funccode:FuncCode.cof_m_role_template,
        meta: {
          title: '角色模板',
        },
      },
      {
        path: 'resource-authority',
        funccode: FuncCode.cof_m_resouce_right,
        component: _import('admin/system/resource-authority/index'),
        name: 'resource-authority',
        meta: {
          title: '资源权限',
        },
      },
      {
        path: 'business-dict',
        funccode: FuncCode.cof_m_dict,
        component: _import('admin/system/biz-dict/index'),
        name: 'business-dict',
        meta: {
          title: '业务字典',
        },
      },
    ],
  },
  {
    path: '/security-audit',
    component: Layout,
    group: 'admin',
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'security-audit',
    meta: {
      title: '安全审计',
      icon: 'audit',
    },
    children: [
      {
        path: 'operation-log',
        funccode: FuncCode.cof_m_opt_log,
        component: _import('admin/security-audit/logger'),
        name: 'operation-log',
        meta: {
          title: '操作日志',
        },
      },
    ],
  },
]
