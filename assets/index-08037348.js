import{J as _,d as A,r as x,a as O,G as j,e as i,K as E,o as p,c as F,b as l,w as t,B as b,v as y,h as u,t as R,f as d,m as T,N as P,F as w,L as B}from"./index-a15cff6e.js";const G=()=>_.get("/admin/acl/permission"),H=r=>r.id?_.put("/admin/acl/permission/update",r):_.post("/admin/acl/permission/save",r),J=r=>_.delete("/admin/acl/permission/remove/"+r),K={class:"dialog-footer"},I=A({__name:"index",setup(r){let g=x([]),o=x(!1),a=O({code:"",level:0,name:"",pid:0});j(()=>{f()});const f=async()=>{let s=await G();s.code==200&&(g.value=s.data)},M=s=>{Object.assign(a,{id:0,code:"",level:0,name:"",pid:0}),o.value=!0,a.level=s.level+1,a.pid=s.id},$=s=>{o.value=!0,Object.assign(a,s)},q=async()=>{(await H(a)).code==200&&(o.value=!1,B({type:"success",message:a.id?"更新成功":"添加成功"}),f())},D=async s=>{(await J(s)).code==200&&(B({type:"success",message:"删除成功"}),f())};return(s,n)=>{const c=i("el-table-column"),m=i("el-button"),N=i("el-popconfirm"),U=i("el-table"),V=i("el-input"),C=i("el-form-item"),h=i("el-form"),z=i("el-dialog"),v=E("has");return p(),F(w,null,[l(U,{data:d(g),style:{width:"100%","margin-bottom":"20px"},"row-key":"id",border:""},{default:t(()=>[l(c,{label:"名称",prop:"name"}),l(c,{label:"权限值",prop:"code"}),l(c,{label:"修改时间",prop:"updateTime"}),l(c,{label:"操作"},{default:t(({row:e,$index:L})=>[b((p(),y(m,{type:"primary",onClick:k=>M(e),size:"small",disabled:e.level==4},{default:t(()=>[u(R(e.level==3?"添加功能":"添加菜单"),1)]),_:2},1032,["onClick","disabled"])),[[v,"btn.Permission.add"]]),b((p(),y(m,{type:"primary",onClick:k=>$(e),size:"small",disabled:e.level==1},{default:t(()=>[u(" 编辑 ")]),_:2},1032,["onClick","disabled"])),[[v,"btn.Permission.update"]]),l(N,{title:`你确定要删除${e.name}?`,width:"260px",onConfirm:k=>D(e.id)},{reference:t(()=>[b((p(),y(m,{type:"primary",size:"small",disabled:e.level==1},{default:t(()=>[u(" 删除 ")]),_:2},1032,["disabled"])),[[v,"btn.Permission.remove"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),l(z,{modelValue:d(o),"onUpdate:modelValue":n[3]||(n[3]=e=>P(o)?o.value=e:o=e),title:d(a).id?"更新菜单":"添加菜单"},{footer:t(()=>[T("span",K,[l(m,{onClick:n[2]||(n[2]=e=>P(o)?o.value=!1:o=!1)},{default:t(()=>[u("取消")]),_:1}),l(m,{type:"primary",onClick:q},{default:t(()=>[u("确定")]),_:1})])]),default:t(()=>[l(h,null,{default:t(()=>[l(C,{label:"名称"},{default:t(()=>[l(V,{placeholder:"请你输入菜单名称",modelValue:d(a).name,"onUpdate:modelValue":n[0]||(n[0]=e=>d(a).name=e)},null,8,["modelValue"])]),_:1}),l(C,{label:"权限"},{default:t(()=>[l(V,{placeholder:"请你输入权限数值",modelValue:d(a).code,"onUpdate:modelValue":n[1]||(n[1]=e=>d(a).code=e)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},8,["modelValue","title"])],64)}}});export{I as default};
