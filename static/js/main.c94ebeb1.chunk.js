(this["webpackJsonpspider-solver"]=this["webpackJsonpspider-solver"]||[]).push([[0],{19:function(e,n,t){"use strict";t.d(n,"a",(function(){return u}));var r=t(18),i=t(5),a=t(6),o=t(7),c=t(9),u=function(){function e(n){Object(i.a)(this,e),this.originalDeck=void 0,this.remainingDeck=void 0,this.columns=void 0,this.originalDeck=n.originalDeck,this.remainingDeck=n.remainingDeck,this.columns=n.columns}return Object(a.a)(e,[{key:"remainingDeals",value:function(){return this.remainingDeck.length/this.columns.length}},{key:"deal",value:function(){var e=this;if(this.remainingDeals()<1)throw new Error("deal is impossible");this.columns.forEach((function(n){n.deal(e.remainingDeck.pop()),n.revealBottom()}))}},{key:"resolvePointers",value:function(e){var n=this.columns.filter((function(n){return n.index===e.columnIndex}))[0],t=n.cards.filter((function(n){return n.state.id===e.cardId}))[0];return{column:n,card:t}}},{key:"possibleMovesFromObj",value:function(e,n){var t=this;return Object(c.b)(this.columns.length-1).map((function(n){var r=(e.index+n+1)%t.columns.length;return t.columns[r]})).filter((function(e){return n.canMoveBelowColumn(e)}))}},{key:"possibleMoves",value:function(e){var n=this.resolvePointers(e),t=n.column,r=n.card;return this.possibleMovesFromObj(t,r)}},{key:"performMove",value:function(e){var n=this.resolvePointers(e),t=n.column,r=n.card;if(t.canMove(r)){var i=this.possibleMovesFromObj(t,r)[0];if(i){var a=t.pop(r);t.revealBottom(),i.push(a)}}}},{key:"serialize",value:function(){return{originalDeck:this.originalDeck,remainingDeck:this.remainingDeck,columns:this.columns.map((function(e){return e.serialize()}))}}}],[{key:"deserialize",value:function(n){var t=n.columns.map((function(e){return o.a.deserialize(e)}));return new e(Object(r.a)(Object(r.a)({},n),{},{columns:t}))}},{key:"createNew",value:function(n){for(var t=Object(c.b)(10).map((function(e){return new o.a(e)})),r=n.concat(),i=0;r.length>50;i++){t[i%t.length].deal(r.pop())}return t.forEach((function(e){return e.revealBottom()})),new e({originalDeck:n,remainingDeck:r,columns:t})}}]),e}()},2:function(e,n,t){"use strict";var r=t(19);t.d(n,"Board",(function(){return r.a}));t(8),t(7);var i=t(20);t.o(i,"GenerateDeck")&&t.d(n,"GenerateDeck",(function(){return i.GenerateDeck}));var a=t(9);t.d(n,"GenerateDeck",(function(){return a.a}))},20:function(e,n){},29:function(e,n,t){},33:function(e,n,t){"use strict";t.r(n);var r,i,a=t(0),o=t.n(a),c=t(21),u=t.n(c),s=(t(29),t(16)),l=t(2),d=t(3),f=t(4),v=t(1),h=f.a.div(r||(r=Object(d.a)(["\n  --suit: ",";\n  padding: 0.5em;\n  width: 4em;\n  text-align: center;\n  color: var(--suit);\n  border: 1px solid var(--suit);\n  border-radius: 0.5em;\n\n  cursor: pointer;\n\n  background-color: ",";\n"])),(function(e){return e.color}),(function(e){return e.canMoveTo?"lightgreen":"white"})),b=["\u2660\ufe0f","\u2665\ufe0f","\u2666\ufe0f","\u2663\ufe0f"],m=["black","red","darkviolet","green"],j=["1","2","3","4","5","6","7","8","9","10","J","Q","K"];function g(e){var n=e.column,t=e.card,r=e.canMove,i=e.onHover,a=e.trigger;if(!t)return Object(v.jsx)(h,{canMoveTo:r,color:"grey",children:"(empty)"});if(t.state.faceUp){var o={columnIndex:n.index,cardId:t.state.id};return Object(v.jsxs)(h,{canMoveTo:r,color:m[t.suit],onClick:a((function(e){return e.performMove(o)})),onMouseEnter:function(){return i(o)},onMouseLeave:function(){return i(void 0)},children:[j[t.value]," ",b[t.suit]]})}return Object(v.jsx)(h,{canMoveTo:r,color:"grey",children:"???"})}var p,k,x,O=f.a.div(i||(i=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: nowrap;\n\n  padding: 1em;\n"])));function y(e){var n=e.column,t=e.canMove,r=e.onHover,i=e.trigger;return Object(v.jsxs)(O,{children:[0===n.cards.length&&Object(v.jsx)(g,{column:n,card:void 0,canMove:t,onHover:function(){},trigger:i}),n.cards.map((function(e,a,o){return Object(v.jsx)(g,{column:n,card:e,canMove:t&&a===o.length-1,onHover:r,trigger:i},a)}))]})}var w=f.a.div(p||(p=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: nowrap;\n"]))),M=f.a.div(k||(k=Object(d.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: nowrap;\n\n  padding: 1em;\n"]))),D=f.a.div(x||(x=Object(d.a)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: nowrap;\n"])));function B(e){var n=e.board,t=e.possibleMoves,r=e.onHover,i=e.trigger,a=e.reset,o=n.remainingDeals(),c=t.map((function(e){return e.index}));return Object(v.jsxs)(w,{children:[Object(v.jsxs)(M,{children:[Object(v.jsx)("button",{onClick:function(){return a(l.Board.createNew(Object(l.GenerateDeck)(1)))},children:"1 suit"}),Object(v.jsx)("button",{onClick:function(){return a(l.Board.createNew(Object(l.GenerateDeck)(2)))},children:"2 suit"}),Object(v.jsx)("button",{onClick:function(){return a(l.Board.createNew(Object(l.GenerateDeck)(3)))},children:"3 suit"}),Object(v.jsx)("button",{onClick:function(){return a(l.Board.createNew(Object(l.GenerateDeck)(4)))},children:"4 suit"})]}),Object(v.jsx)(M,{children:o?Object(v.jsxs)("button",{onClick:i((function(e){return e.deal()})),children:["Deal ",o]}):null}),Object(v.jsx)(D,{children:n.columns.map((function(e,n){return Object(v.jsx)(y,{column:e,canMove:c.includes(n),onHover:r,trigger:i},n)}))})]})}function C(){var e=Object(a.useState)(l.Board.createNew(Object(l.GenerateDeck)(4)).serialize()),n=Object(s.a)(e,2),t=n[0],r=n[1],i=Object(a.useState)(void 0),o=Object(s.a)(i,2),c=o[0],u=o[1],d=Object(a.useCallback)((function(e){return function(){var n=l.Board.deserialize(t);e(n),r(n.serialize())}}),[t,r]),f=Object(a.useCallback)((function(e){r(e.serialize())}),[r]),h=l.Board.deserialize(t),b=c?h.possibleMoves(c):[];return Object(v.jsx)(B,{board:h,possibleMoves:b,onHover:u,trigger:d,reset:f})}var z=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,34)).then((function(n){var t=n.getCLS,r=n.getFID,i=n.getFCP,a=n.getLCP,o=n.getTTFB;t(e),r(e),i(e),a(e),o(e)}))};u.a.render(Object(v.jsx)(o.a.StrictMode,{children:Object(v.jsx)(C,{})}),document.getElementById("root")),z()},7:function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var r=t(13),i=t(5),a=t(6),o=t(8),c=function(){function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];Object(i.a)(this,e),this.index=n,this.cards=t}return Object(a.a)(e,[{key:"deal",value:function(e){this.cards.push(new o.a(e))}},{key:"revealBottom",value:function(){var e;null===(e=this.cards[this.cards.length-1])||void 0===e||e.reveal()}},{key:"relIndexOf",value:function(e){return this.cards.findIndex((function(n){return n.state.id===e.state.id}))}},{key:"canMove",value:function(e){if(!e.state.faceUp)return!1;var n=this.relIndexOf(e);if(n<0)return!1;if(n===this.cards.length-1)return!0;var t=this.getHead();if(t){var r=this.relIndexOf(t);if(r>=0&&r<=n)return!0}return!1}},{key:"pop",value:function(e){var n=this.relIndexOf(e);if(n<0)throw new Error("illegal move");for(var t=[];this.cards.length>n;)t.push(this.cards.pop());return t.reverse()}},{key:"push",value:function(e){var n;(n=this.cards).push.apply(n,Object(r.a)(e))}},{key:"getHead",value:function(){for(var e=this.cards.length-1,n=this.cards[e],t=this.cards[e-1];t&&n&&n.canMoveBelowCard(t);)e--,n=this.cards[e],t=this.cards[e-1];return n}},{key:"getLeaf",value:function(){return this.cards[this.cards.length-1]}},{key:"serialize",value:function(){return{index:this.index,cards:this.cards.map((function(e){return e.serialize()}))}}}],[{key:"deserialize",value:function(n){var t=n.cards.map((function(e){return o.a.deserialize(e)}));return new e(n.index,t)}}]),e}()},8:function(e,n,t){"use strict";t.d(n,"a",(function(){return a}));var r=t(5),i=t(6),a=function(){function e(n){Object(r.a)(this,e),this.state=n,this.suit=void 0,this.value=void 0,this.suit=Math.floor(n.code/100),this.value=n.code%100}return Object(i.a)(e,[{key:"reveal",value:function(){this.state.faceUp=!0}},{key:"canMoveBelowCard",value:function(e){return this.value+1===e.value}},{key:"canMoveBelowColumn",value:function(e){var n=e.getLeaf();return!n||this.canMoveBelowCard(n)}},{key:"serialize",value:function(){return this.state}}],[{key:"deserialize",value:function(n){return new e(n)}}]),e}()},9:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"a",(function(){return a}));var r=t(13);function i(e){for(var n=[],t=0;t<e;t++)n.push(t);return n}function a(e){var n=function(e){var n=[];return e.forEach((function(e){return n.push.apply(n,Object(r.a)(e))})),n}(i(8).map((function(n){var t=n%e;return i(13).map((function(e){return function(e,n,t){return{id:e,code:100*n+t,faceUp:!1}}(13*n+e,t,e)}))})));return function(e){for(var n=e.length,t=0;0!==n;){t=Math.floor(Math.random()*n),n--;var r=[e[t],e[n]];e[n]=r[0],e[t]=r[1]}}(n),n}}},[[33,1,2]]]);
//# sourceMappingURL=main.c94ebeb1.chunk.js.map