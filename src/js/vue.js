import Vue from "vue";

Vue.config.productionTip = false;

// import HelloWorld from '../components/HelloWorld.vue'

const requireComponent = require.context(
    "../components",
    true,
    /[A-Z]\w+\.(vue|js)$/
);
  
requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
        camelCase(
        fileName
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
    );
    Vue.component(
        componentName,
        componentConfig.default || componentConfig
    );
});

new Vue({
  el: "#app",
  delimiters: ["${", "}"],
  // components: {
  //   HelloWorld
  // },
});