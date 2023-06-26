import{J as k,d as P,r as g,G as R,e as o,K as O,o as p,v as S,w as t,b as e,m as V,B as x,h as u,t as f,c as z,F as I,q as N,L as v,p as Q,k as W,_ as X}from"./index-a15cff6e.js";const Y=(n,i)=>k.get(`/admin/product/list/${n}/${i}`),Z=n=>k.get("/admin/product/onSale/"+n),ee=n=>k.get("/admin/product/cancelSale/"+n),te=n=>k.get("/admin/product/getSkuInfo/"+n),ae=n=>k.delete("/admin/product/deleteSku/"+n),le=n=>(Q("data-v-80bbd643"),n=n(),W(),n),ne=["src"],se=le(()=>V("h4",null,"查看商品详情",-1)),oe=["src"],ue=P({__name:"index",setup(n){const i=g(1),b=g(10),D=g(0),w=g([]),C=g(!1),c=g({}),_=async(r=1)=>{i.value=r;let l=await Y(i.value,b.value);l.code==200&&(w.value=l.data.records,D.value=l.data.total)},B=()=>{_()},L=async r=>{r.isSale?(await ee(r.id),v.success("下架成功！"),_(i.value)):(await Z(r.id),v.success("上架成功！"),_(i.value))},U=()=>{v.warning("程序员正在努力更新中...")},A=async r=>{C.value=!0;let l=await te(r.id);c.value=l.data},E=async r=>{(await ae(r.id)).code==200?(v.success("删除成功"),_(w.value.length>1?i.value:i.value-1)):v.error("系统数据，不能删除")};return R(_),(r,l)=>{const d=o("el-table-column"),y=o("el-button"),F=o("el-popconfirm"),K=o("el-table"),M=o("el-pagination"),s=o("el-col"),m=o("el-row"),$=o("el-tag"),T=o("el-carousel-item"),j=o("el-carousel"),G=o("el-drawer"),H=o("el-card"),h=O("has");return p(),S(H,null,{default:t(()=>[e(K,{data:w.value,border:"",style:{margin:"10px 0"},height:"calc(100vh - 180px)"},{default:t(()=>[e(d,{label:"序号",type:"index",width:"80",align:"center"}),e(d,{prop:"skuName",label:"名称",width:"250"}),e(d,{prop:"skuDesc",label:"描述",width:"450"}),e(d,{label:"默认图片",width:"350"},{default:t(({row:a,$index:J})=>[V("img",{src:a.skuDefaultImg,style:{width:"120px",height:"120px"},alt:""},null,8,ne)]),_:1}),e(d,{prop:"weight",label:"重量(g)",width:"150"}),e(d,{prop:"price",label:"价格(元)",width:"150"}),e(d,{fixed:"right",label:"操作",width:"280"},{default:t(({row:a,$index:J})=>[x(e(y,{type:a.isSale==1?"primary":"success",size:"small",icon:a.isSale==1?"Bottom":"Top",onClick:q=>L(a)},null,8,["type","icon","onClick"]),[[h,"btn.Sku.updown"]]),x(e(y,{type:"warning",size:"small",icon:"Edit",onClick:U},null,512),[[h,"btn.Sku.update"]]),x(e(y,{type:"info",size:"small",icon:"InfoFilled",onClick:q=>A(a)},null,8,["onClick"]),[[h,"btn.Sku.detail"]]),e(F,{title:`你确定删除${a.skuName}吗?`,width:"200px",onConfirm:q=>E(a)},{reference:t(()=>[x(e(y,{type:"danger",size:"small",icon:"Delete",title:"删除SKU",onClick:l[0]||(l[0]=()=>{})},null,512),[[h,"btn.Sku.remove"]])]),_:2},1032,["title","onConfirm"])]),_:1})]),_:1},8,["data"]),e(M,{"current-page":i.value,"onUpdate:currentPage":l[1]||(l[1]=a=>i.value=a),"page-size":b.value,"onUpdate:pageSize":l[2]||(l[2]=a=>b.value=a),"page-sizes":[10,20,50,100],background:"",layout:" prev, pager, next, jumper,->, sizes,total",total:D.value,onSizeChange:B,onCurrentChange:_},null,8,["current-page","page-size","total"]),e(G,{modelValue:C.value,"onUpdate:modelValue":l[3]||(l[3]=a=>C.value=a)},{header:t(()=>[se]),default:t(()=>[e(m,{style:{margin:"10px 0"}},{default:t(()=>[e(s,{span:6},{default:t(()=>[u("名称")]),_:1}),e(s,{span:18},{default:t(()=>[u(f(c.value.skuName),1)]),_:1})]),_:1}),e(m,{style:{margin:"10px 0"}},{default:t(()=>[e(s,{span:6},{default:t(()=>[u("描述")]),_:1}),e(s,{span:18},{default:t(()=>[u(f(c.value.skuDesc),1)]),_:1})]),_:1}),e(m,{style:{margin:"10px 0"}},{default:t(()=>[e(s,{span:6},{default:t(()=>[u("价格")]),_:1}),e(s,{span:18},{default:t(()=>[u(f(c.value.price),1)]),_:1})]),_:1}),e(m,{style:{margin:"10px 0"}},{default:t(()=>[e(s,{span:6},{default:t(()=>[u("平台属性")]),_:1}),e(s,{span:18},{default:t(()=>[(p(!0),z(I,null,N(c.value.skuAttrValueList,a=>(p(),S($,{type:"danger",style:{margin:"5px"},key:a.id},{default:t(()=>[u(f(a.valueName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(m,{style:{margin:"10px 0"}},{default:t(()=>[e(s,{span:6},{default:t(()=>[u("销售属性")]),_:1}),e(s,{span:18},{default:t(()=>[(p(!0),z(I,null,N(c.value.skuSaleAttrValueList,a=>(p(),S($,{type:"success",style:{margin:"5px"},key:a.id},{default:t(()=>[u(f(a.saleAttrValueName),1)]),_:2},1024))),128))]),_:1})]),_:1}),e(m,{style:{margin:"10px 0"}},{default:t(()=>[e(s,{span:6},{default:t(()=>[u("商品图片")]),_:1}),e(s,{span:18},{default:t(()=>[e(j,{interval:4e3,type:"card",height:"200px"},{default:t(()=>[(p(!0),z(I,null,N(c.value.skuImageList,a=>(p(),S(T,{key:a},{default:t(()=>[V("img",{src:a.imgUrl,alt:"",style:{width:"100%",height:"100%"}},null,8,oe)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}});const re=X(ue,[["__scopeId","data-v-80bbd643"]]);export{re as default};
