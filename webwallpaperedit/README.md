# WallpaperEngine Web模板

------

基于Web的WallpaperEngine模板，内置了视差、粒子、时钟，模板会根据时间和季节切换图片资源。

------

## 建立安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 模板配置

模板配置文件在static/config.json中，其中包含了图层，季节和时间的配置。

> 这是一个示例配置，同时也是默认配置文件

```json
{
    "layer": {
        "background": {
            "file": "bg",
            "type": "png",
            "parallax": 0.1,
            "class": {
                "width": "100vw",
                "margin-left": "100vw"
            },
            "src": "bgimg.jpg"
        }
    },
    "common": {
        "Season": {
            "spring": {
                "label": "spring",
                "months": {
                    "start": 4,
                    "end": 6
                }
            },
            "autumn": {
                "label": "autumn",
                "months": {
                    "start": 10,
                    "end": 11
                }
            },
            "summer": {
                "label": "summer",
                "months": {
                    "start": 7,
                    "end": 9
                }
            },
            "winter": {
                "label": "winter",
                "months": {
                    "start": 12,
                    "end": 3
                }
            }
        },
        "periods": {
            "day": {
                "label": "day",
                "benchmarks": "sunrise",
                "deviation": 0
            },
            "dusk": {
                "label": "evening",
                "benchmarks": "sunset",
                "deviation": 30
            },
            "night": {
                "label": "night",
                "benchmarks": "sunset",
                "deviation": 0
            }
        }
    }
}
```

-----
## WallpaperEngine配置
模板可在WallpaperEngine中添加自定义配置功能，在生成项目后可在project.json中的properties里添加下列功能。


```json
{
    "Parallax": {
        "text": "视差(parallax)",
        "type": "bool",
        "value": true
    },
    "season": {
        "options": [{
                "label": "自动-北半球(Auto)",
                "value": "nAuto"
            },
            {
                "label": "自动-南半球(Auto)",
                "value": "sAuto"
            },
            {
                "label": "春季(spring)",
                "value": "spring"
            },
            {
                "label": "夏季(summer)",
                "value": "summer"
            },
            {
                "label": "秋季(autumn)",
                "value": "autumn"
            },
            {
                "label": "冬季(winter)",
                "value": "winter"
            }
        ],
        "text": "季节(season)",
        "type": "combo",
        "value": "nAuto"
    },
    "region": {
        "options": [{
            "label": "北京(Beijing)",
            "value": "{w:39.90,s:116.24,u:8}"
        }],
        "text": "地区(region)",
        "type": "combo",
        "value": "{w:39.90,s:116.24,u:8}"
    },
    "clock1": {
        "text": "时间显示(time display)",
        "type": "bool",
        "value": true
    },
    "clock2": {
        "text": "12小时制(12-hour clock)",
        "type": "bool",
        "value": true
    },
    "clockx": {
        "max": 100,
        "min": 0,
        "text": "时间位置(X)",
        "type": "slider",
        "value": 10
    },
    "clocky": {
        "max": 100,
        "min": 0,
        "text": "时间位置(Y)",
        "type": "slider",
        "value": 42
    }
}
```
