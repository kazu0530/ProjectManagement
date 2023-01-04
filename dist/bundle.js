(()=>{"use strict";class e{constructor(e,t,n,r){this.templateElement=document.getElementById(e),this.hostElement=document.getElementById(t);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function t(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minlength&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minlength),null!=e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLength),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),t}function n(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var r;!function(e){e[e.Active=0]="Active",e[e.finished=1]="finished"}(r||(r={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.manday=r,this.status=s}}class i{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}class a extends i{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new a),this.instance}addProject(e,t,n){const i=new s(Math.random().toString(),e,t,n,r.Active);this.projects.push(i),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!=t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const l=a.getInstance();class o extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.mandayInputElement=this.element.querySelector("#manday"),this.configure()}configure(){this.element.addEventListener("submit",this.submitHandler)}renderContent(){}gatherUserInput(){const e=this.titleInputElement.value,n=this.descriptionInputElement.value,r=this.mandayInputElement.value,s={value:n,required:!0,minlength:5},i={value:+r,required:!0,max:100,min:1};return t({value:e,required:!0})&&t(s)&&t(i)?[e,n,+r]:void alert("入力値が正しくありません")}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.mandayInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,r]=t;l.addProject(e,n,r),console.log(e,n,r),this.clearInputs()}}}!function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);i>3&&a&&Object.defineProperty(t,n,a)}([n],o.prototype,"submitHandler",null);class c extends e{get manday(){return this.project.manday<20?this.project.manday.toString()+"人日":(this.project.manday/20).toString()+"人月"}constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("drag終了")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.manday,this.element.querySelector("p").textContent=this.project.description}}!function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);i>3&&a&&Object.defineProperty(t,n,a)}([n],c.prototype,"dragStartHandler",null);var d=function(e,t,n,r){var s,i=arguments.length,a=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var l=e.length-1;l>=0;l--)(s=e[l])&&(a=(i<3?s(a):i>3?s(t,n,a):s(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a};class u extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assingedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=e.dataTransfer.getData("text/plain");l.moveProject(t,"active"===this.type?r.Active:r.finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("drop",this.dropHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),l.addListener((e=>{const t=e.filter((e=>"active"===this.type?e.status===r.Active:e.status===r.finished));this.assingedProjects=t,this.renderProjects()}))}renderContent(){const e=`${this.type}-projects-list`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent="active"===this.type?"実行中プロジェクト":"完了プロジェクト"}renderProjects(){const e=document.getElementById(`${this.type}-projects-list`);e.innerHTML="";for(const t of this.assingedProjects)new c(e.id,t)}}d([n],u.prototype,"dragOverHandler",null),d([n],u.prototype,"dropHandler",null),d([n],u.prototype,"dragLeaveHandler",null),new o,new u("active"),new u("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly4vc3JjL2NvbXBvbmVudHMvYmFzZS1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFxuICBUIGV4dGVuZHMgSFRNTEVsZW1lbnQsXG4gIFUgZXh0ZW5kcyBIVE1MRWxlbWVudFxuPiB7XG4gIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgaG9zdEVsZW1lbnQ6IFQ7XG4gIGVsZW1lbnQ6IFU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcbiAgICBpbnNlcnRBdFN0YXJ0OiBib29sZWFuLFxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZ1xuICApIHtcbiAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGVtcGxhdGVJZFxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XG4gICAgdGhpcy5ob3N0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW50SWQpISBhcyBUO1xuICAgIGNvbnN0IGltcG9ydGVkTm9kZSA9IGRvY3VtZW50LmltcG9ydE5vZGUoXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxuICAgICAgdHJ1ZVxuICAgICkhO1xuICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcbiAgICB9XG4gICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydCk7XG4gIH1cblxuICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcbiAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xuXG4gIHByaXZhdGUgYXR0YWNoKGluc2VydEF0QmVnaW5uaW5nOiBib29sZWFuKSB7XG4gICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICBpbnNlcnRBdEJlZ2lubmluZyA/IFwiYWZ0ZXJiZWdpblwiIDogXCJiZWZvcmVlbmRcIixcbiAgICAgIHRoaXMuZWxlbWVudFxuICAgICk7XG4gIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIG1pbmxlbmd0aD86IG51bWJlcjtcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XG4gIGxldCBpc1ZhbGlkID0gdHJ1ZTtcbiAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW5sZW5ndGggIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXG4gICkge1xuICAgIGlzVmFsaWQgPVxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbmxlbmd0aDtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXG4gICkge1xuICAgIGlzVmFsaWQgPVxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aDtcbiAgfVxuICBpZiAoXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJlxuICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcIm51bWJlclwiXG4gICkge1xuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGFibGVJbnB1dC5taW47XG4gIH1cbiAgaWYgKFxuICAgIHZhbGlkYXRhYmxlSW5wdXQubWF4ICE9IG51bGwgJiZcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIlxuICApIHtcbiAgICB7XG4gICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4O1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXNWYWxpZDtcbn1cbiIsIi8vXG4vLyAgYXV0b2JpbmQgZGVjcmF0b3JcbmV4cG9ydCBmdW5jdGlvbiBhdXRvYmluZChcbiAgX3RhcmdldDogYW55LFxuICBfbWV0aG9kTmFtZTogc3RyaW5nLFxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3Jcbikge1xuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGNvbnN0IGFkakRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XG4gICAgICByZXR1cm4gYm91bmRGbjtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gYWRqRGVzY3JpcHRvcjtcbn1cbiIsImV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xuICBBY3RpdmUsXG4gIGZpbmlzaGVkLFxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpZDogc3RyaW5nLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIHB1YmxpYyBtYW5kYXk6IG51bWJlcixcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXG4gICkge31cbn1cbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcbi8vcHJvamVjdCBzdGF0ZSBtYW5hZ2VtZW50XG50eXBlIExpc250ZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcblxuY2xhc3MgU3RhdGU8VD4ge1xuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXNudGVyPFQ+W10gPSBbXTtcblxuICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXNudGVyPFQ+KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgYWRkUHJvamVjdCh0aXRpbGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbWFuZGF5OiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICB0aXRpbGUsXG4gICAgICBkZXNjcmlwdGlvbixcbiAgICAgIG1hbmRheSxcbiAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlXG4gICAgKTtcbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XG4gICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKChwcmopID0+IHByai5pZCA9PT0gcHJvamVjdElkKTtcbiAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPSBuZXdTdGF0dXMpIHtcbiAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcbiIsImltcG9ydCBDbXAgZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcbmltcG9ydCAqIGFzIHZhbGlkYXRpb24gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgYXMgQXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3Qtc3RhdGVcIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENtcDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICBkZXNjcmlwdGlvbklucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgbWFuZGF5SW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwicHJvamVjdC1pbnB1dFwiLCBcImFwcFwiLCB0cnVlLCBcInVzZXItaW5wdXRcIik7XG5cbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIiN0aXRsZVwiXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIjZGVzY3JpcHRpb25cIlxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIHRoaXMubWFuZGF5SW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIiNtYW5kYXlcIlxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gIH1cblxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRIYW5kbGVyKTtcbiAgfVxuXG4gIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7fVxuICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcbiAgICBjb25zdCBlbnRlcmRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XG4gICAgY29uc3QgZW50ZXJkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IGVudGVyZE1hbmRheSA9IHRoaXMubWFuZGF5SW5wdXRFbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6IHZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogZW50ZXJkVGl0bGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGFibGU6IHZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XG4gICAgICB2YWx1ZTogZW50ZXJkRGVzY3JpcHRpb24sXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbmxlbmd0aDogNSxcbiAgICB9O1xuICAgIGNvbnN0IG1hbmRheVZhbGlkYXRhYmxlOiB2YWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xuICAgICAgdmFsdWU6ICtlbnRlcmRNYW5kYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1heDogMTAwLFxuICAgICAgbWluOiAxLFxuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICAhdmFsaWRhdGlvbi52YWxpZGF0ZSh0aXRsZVZhbGlkYXRhYmxlKSB8fFxuICAgICAgIXZhbGlkYXRpb24udmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHxcbiAgICAgICF2YWxpZGF0aW9uLnZhbGlkYXRlKG1hbmRheVZhbGlkYXRhYmxlKVxuICAgICkge1xuICAgICAgYWxlcnQoXCLlhaXlipvlgKTjgYzmraPjgZfjgY/jgYLjgorjgb7jgZvjgpNcIik7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbZW50ZXJkVGl0bGUsIGVudGVyZERlc2NyaXB0aW9uLCArZW50ZXJkTWFuZGF5XTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xuICAgIHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xuICAgIHRoaXMubWFuZGF5SW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcbiAgfVxuXG4gIEBBdXRvYmluZFxuICBwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZXZlbnQ6IEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHVzZXJJbnB1dCkpIHtcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgbWFuZGF5XSA9IHVzZXJJbnB1dDtcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBtYW5kYXkpO1xuICAgICAgY29uc29sZS5sb2codGl0bGUsIGRlc2MsIG1hbmRheSk7XG4gICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuLi9tb2RlbHMvcHJvamVjdFwiO1xuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuXG4vLyBQcm9qZWN0SVRlbVxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+XG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlXG57XG4gIHByaXZhdGUgcHJvamVjdDogUHJvamVjdDtcblxuICBnZXQgbWFuZGF5KCkge1xuICAgIGlmICh0aGlzLnByb2plY3QubWFuZGF5IDwgMjApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2plY3QubWFuZGF5LnRvU3RyaW5nKCkgKyBcIuS6uuaXpVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKHRoaXMucHJvamVjdC5tYW5kYXkgLyAyMCkudG9TdHJpbmcoKSArIFwi5Lq65pyIXCI7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcbiAgICBzdXBlcihcInNpbmdsZS1wcm9qZWN0XCIsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3Q7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSBcIm1vdmVcIjtcbiAgfVxuICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhcImRyYWfntYLkuoZcIik7XG4gIH1cblxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgdGhpcy5kcmFnRW5kSGFuZGxlcik7XG4gIH1cblxuICByZW5kZXJDb250ZW50KCkge1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ID0gdGhpcy5tYW5kYXk7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9tb2RlbHMvZHJhZy1kcm9wXCI7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gXCIuL2Jhc2UtY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tIFwiLi9wcm9qZWN0LWl0ZW1cIjtcblxuZXhwb3J0IGNsYXNzIFByb2plY3RMbGlzdFxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XG4gIGltcGxlbWVudHMgRHJhZ1RhcmdldFxue1xuICBhc3NpbmdlZFByb2plY3RzOiBQcm9qZWN0W107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiBcImFjdGl2ZVwiIHwgXCJmaW5pc2hlZFwiKSB7XG4gICAgc3VwZXIoXCJwcm9qZWN0LWxpc3RcIiwgXCJhcHBcIiwgZmFsc2UsIGAke3R5cGV9LXByb2plY3RzYCk7XG4gICAgdGhpcy5hc3NpbmdlZFByb2plY3RzID0gW107XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09IFwidGV4dC9wbGFpblwiKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZChcImRyb3BwYWJsZVwiKTtcbiAgICB9XG4gIH1cbiAgQGF1dG9iaW5kXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxuICAgICAgcHJqSWQsXG4gICAgICB0aGlzLnR5cGUgPT09IFwiYWN0aXZlXCIgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuZmluaXNoZWRcbiAgICApO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wcGFibGVcIik7XG4gIH1cblxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XG5cbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcbiAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByaikgPT4ge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XG4gICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLmZpbmlzaGVkO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmFzc2luZ2VkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xuICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyQ29udGVudCgpIHtcbiAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkID0gbGlzdElkO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhLnRleHRDb250ZW50ID1cbiAgICAgIHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIiA/IFwi5a6f6KGM5Lit44OX44Ot44K444Kn44Kv44OIXCIgOiBcIuWujOS6huODl+ODreOCuOOCp+OCr+ODiFwiO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJQcm9qZWN0cygpIHtcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGBcbiAgICApISBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgIGxpc3RFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2luZ2VkUHJvamVjdHMpIHtcbiAgICAgIG5ldyBQcm9qZWN0SXRlbShsaXN0RWwuaWQsIHByakl0ZW0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XG5pbXBvcnQgeyBQcm9qZWN0TGxpc3QgfSBmcm9tIFwiLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdFwiO1xuXG5uZXcgUHJvamVjdElucHV0KCk7XG5uZXcgUHJvamVjdExsaXN0KFwiYWN0aXZlXCIpO1xubmV3IFByb2plY3RMbGlzdChcImZpbmlzaGVkXCIpO1xuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwidGVtcGxhdGVJZCIsImhvc3RFbGVtZW50SWQiLCJpbnNlcnRBdFN0YXJ0IiwibmV3RWxlbWVudElkIiwidGhpcyIsInRlbXBsYXRlRWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJob3N0RWxlbWVudCIsImltcG9ydGVkTm9kZSIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiZWxlbWVudCIsImZpcnN0RWxlbWVudENoaWxkIiwiaWQiLCJhdHRhY2giLCJpbnNlcnRBdEJlZ2lubmluZyIsImluc2VydEFkamFjZW50RWxlbWVudCIsInZhbGlkYXRlIiwidmFsaWRhdGFibGVJbnB1dCIsImlzVmFsaWQiLCJyZXF1aXJlZCIsInZhbHVlIiwidG9TdHJpbmciLCJ0cmltIiwibGVuZ3RoIiwibWlubGVuZ3RoIiwibWF4TGVuZ3RoIiwibWluIiwibWF4IiwiYXV0b2JpbmQiLCJfdGFyZ2V0IiwiX21ldGhvZE5hbWUiLCJkZXNjcmlwdG9yIiwib3JpZ2luYWxNZXRob2QiLCJjb25maWd1cmFibGUiLCJnZXQiLCJiaW5kIiwiUHJvamVjdFN0YXR1cyIsIlByb2plY3QiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwibWFuZGF5Iiwic3RhdHVzIiwiU3RhdGUiLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lciIsImxpc3RlbmVyRm4iLCJwdXNoIiwiUHJvamVjdFN0YXRlIiwic3VwZXIiLCJwcm9qZWN0cyIsInN0YXRpYyIsImluc3RhbmNlIiwiYWRkUHJvamVjdCIsInRpdGlsZSIsIm5ld1Byb2plY3QiLCJNYXRoIiwicmFuZG9tIiwiQWN0aXZlIiwidXBkYXRlTGlzdGVuZXJzIiwibW92ZVByb2plY3QiLCJwcm9qZWN0SWQiLCJuZXdTdGF0dXMiLCJwcm9qZWN0IiwiZmluZCIsInByaiIsInNsaWNlIiwicHJvamVjdFN0YXRlIiwiZ2V0SW5zdGFuY2UiLCJQcm9qZWN0SW5wdXQiLCJ0aXRsZUlucHV0RWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJkZXNjcmlwdGlvbklucHV0RWxlbWVudCIsIm1hbmRheUlucHV0RWxlbWVudCIsImNvbmZpZ3VyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdWJtaXRIYW5kbGVyIiwicmVuZGVyQ29udGVudCIsImdhdGhlclVzZXJJbnB1dCIsImVudGVyZFRpdGxlIiwiZW50ZXJkRGVzY3JpcHRpb24iLCJlbnRlcmRNYW5kYXkiLCJkZXNjcmlwdGlvblZhbGlkYXRhYmxlIiwibWFuZGF5VmFsaWRhdGFibGUiLCJhbGVydCIsImNsZWFySW5wdXRzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInVzZXJJbnB1dCIsIkFycmF5IiwiaXNBcnJheSIsImRlc2MiLCJjb25zb2xlIiwibG9nIiwiUHJvamVjdEl0ZW0iLCJob3N0SWQiLCJkcmFnU3RhcnRIYW5kbGVyIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJkcmFnRW5kSGFuZGxlciIsIl8iLCJ0ZXh0Q29udGVudCIsIlByb2plY3RMbGlzdCIsInR5cGUiLCJhc3NpbmdlZFByb2plY3RzIiwiZHJhZ092ZXJIYW5kbGVyIiwidHlwZXMiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcm9wSGFuZGxlciIsInByaklkIiwiZ2V0RGF0YSIsImZpbmlzaGVkIiwiZHJhZ0xlYXZlSGFuZGxlciIsInJlbW92ZSIsInJlbGV2YW50UHJvamVjdHMiLCJmaWx0ZXIiLCJyZW5kZXJQcm9qZWN0cyIsImxpc3RJZCIsImxpc3RFbCIsImlubmVySFRNTCIsInByakl0ZW0iXSwic291cmNlUm9vdCI6IiJ9