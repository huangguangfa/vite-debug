## 个人 vite 调试仓库


## transformMain
```js
/* 
    transformMain方法主要对vue文件做编译
    包含template模版 => js
    setup script => js => defineComponent
    style处理: 重写路径去重新加载syle
*/
// <script></script>处理后的结果
<script>
    import { defineComponent as _defineComponent } from 'vue'
    import { ref, getCurrentInstance } from 'vue'
    import Assets from './Assets.vue'

    export default /*#__PURE__*/_defineComponent({
        __name: 'Main',
        setup(__props, { expose }) {
            expose();
            const res = getCurrentInstance()
            console.log(res)
            const time = ref('loading...')
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const [entry] = performance.getEntriesByType('navigation')
                    time.value = `loaded in ${entry.duration.toFixed(2)}ms.`
                }, 0)
            })
            const __returned__ = { res, time }
            Object.defineProperty(
                __returned__,
                '__isScriptSetup',
                { enumerable: false, value: true }
            )
            return __returned__
        }
    })
</script>


// <template></template>处理后的结果
<script>
    import {
        createCommentVNode as _createCommentVNode,
        createElementVNode as _createElementVNode,
        toDisplayString as _toDisplayString,
        createTextVNode as _createTextVNode,
        Fragment as _Fragment,
        openBlock as _openBlock,
        createElementBlock as _createElementBlock
    } from "vue"
    const _hoisted_1 =/*#__PURE__*/ _createElementVNode("div", { class: "comments" }, [  /*#__PURE__*/ _createCommentVNode("hello")], -1 /* HOISTED */)
    const _hoisted_2 =/*#__PURE__*/_createElementVNode("h1", null, "Vue SFCs2", -1 /* HOISTED */)

    function _sfc_render(
        _ctx,
        _cache,
        $props,
        $setup,
        $data,
        $options
    ) {
        return (
            _openBlock(),
            _createElementBlock(
                _Fragment, null,
                [
                    _hoisted_1,
                    _hoisted_2,
                    _createTextVNode(" " + _toDisplayString($setup.time), 1 /* TEXT */),
                    _createCommentVNode("<Assets></Assets>")
                ],
                64
                /* STABLE_FRAGMENT */
            )

        )
    }
</script>

```