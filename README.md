# 此模板使用 redux 作为数据管理工具

+ 项目名:  
+ 产品KEY:  
+ UId:
+ 描述:  


## 目录结构描述
│  .babel               &emsp; &emsp;&emsp;&emsp;             babel转码配置<br />
│  .eslintignore        &emsp; &emsp;&emsp;&emsp;             eslint忽略文件<br />
│  .eslintrc.js         &emsp; &emsp;&emsp;&emsp;             eslint配置<br />
│  .gitignore           &emsp; &emsp;&emsp;&emsp;             git忽略配置<br />
│  .npmrc               &emsp; &emsp;&emsp;&emsp;             npm配置<br />
│  .prettierignore      &emsp; &emsp;&emsp;&emsp;             prettier忽略<br />
│  .prettierrc          &emsp; &emsp;&emsp;&emsp;             prettier配置<br />
│  index.android.js     &emsp; &emsp;&emsp;&emsp;             native加载ReactNative的主入口<br />
│  index.ios.js         &emsp; &emsp;&emsp;&emsp;             native加载ReactNative的主入口<br />
│  index.js             &emsp; &emsp;&emsp;&emsp;             native加载ReactNative的主入口<br />
│  package.json         &emsp; &emsp;&emsp;&emsp;             项目库文件<br />
│  README.md            &emsp; &emsp;&emsp;&emsp;             帮助说明文档<br />
│  rn-cli.config.js     &emsp; &emsp;&emsp;&emsp;             RN配置<br />
│  tsconfig.json        &emsp; &emsp;&emsp;&emsp;             TS配置<br />
├─.vsc
│      settings.json    &emsp; &emsp;&emsp;&emsp;             解决项目Eslint不生效问题<br />
├─docs                  &emsp; &emsp;&emsp;&emsp;             项目相关文档存储<br />
├─src                               <br />
│  │  composeLayout.tsx &emsp; &emsp;&emsp;&emsp;             涂鸦容器封装类<br />
│  │  main.tsx          &emsp; &emsp;&emsp;&emsp;             面板加载入口<br />
│  ├─api                &emsp; &emsp;&emsp;&emsp;             云端接口相关<br />
│  ├─asset              &emsp; &emsp;&emsp;&emsp;             静态资源的引用文件<br />
│  ├─components         &emsp; &emsp;&emsp;&emsp;             项目组件<br />
│  ├─config             &emsp; &emsp;&emsp;&emsp;             项目配置，涂鸦2.0引入主题，里面放入了主题配置<br />
│  ├─containers         &emsp; &emsp;&emsp;&emsp;             面板页面<br />
│  ├─data               &emsp; &emsp;&emsp;&emsp;             项目所有数据处理相关。如:数据解析与反解析，常见于raw或字符型dp点
│  ├─dp                 &emsp; &emsp;&emsp;&emsp;             dp点配置相关。配置dp点的code或value，由开发者根据自身项目自行决定。<br />
│  ├─i18n               &emsp; &emsp;&emsp;&emsp;            文案相关<br />
│  ├─interface          &emsp; &emsp;&emsp;&emsp;            整体项目级别公共类型接口定义<br />
│  ├─redux              &emsp; &emsp;&emsp;&emsp;            redux相关<br />
│  │  │  combine.ts     &emsp; &emsp;&emsp;&emsp;            reducer的合并<br />
│  │  │  configureStore.ts   &emsp; &emsp;&emsp;&emsp;       redux store的配置<br />
│  │  └─modules         &emsp; &emsp;&emsp;&emsp;            reducer的定义<br />
│  ├─res                &emsp; &emsp;&emsp;&emsp;            静态资源源文件<br />
│  ├─router             &emsp; &emsp;&emsp;&emsp;            路由配置<br />
│  └─utils              &emsp; &emsp;&emsp;&emsp;            工具类、屏幕适配类<br />
└─types                 &emsp; &emsp;&emsp;&emsp;            <br />
        index.d.ts      &emsp; &emsp;&emsp;&emsp;            三方库声明文件<br />

## 其他
尽量将interface声明文件单独拎出来，和原代码同级。保持颗粒化
@/router = "src/router/"],
@/containers = "src/containers/*"],
@/* = "src/*"],
@/interface = "src/interface/*",
@/ratio = "src/utils/ratio",