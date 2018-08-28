# [WallpaperEngine-WebTemplate](https://github.com/HalcyonAlcedo/WallpaperEngine-WebTemplate)

WallpaperEngine-WebTemplate是用于在WallpaperEngine上快速生成Web壁纸的模板文件，内置了[**视差（parallax-js）**](https://github.com/wagerfield/parallax) 、[**粒子（parallax.js）**](https://github.com/wagerfield/parallax) 、时钟 、时间和季节切换功能 。

## 图片资源
WallpaperEngine-WebTemplate会根据配置文件中的信息加载`/static/resources/`文件夹中放置的图片资源。

图片资源命名规则按照配置文件中的`layer -> file`  `common -> Season -> label`  `common -> periods-> label` .`layer -> type`来命名。
示例配置
```json:
{
    "layer": {
        "background": {
            "file": "bg",
            "type": "png"
        }
    },
    "common": {
        "Season": {
            "spring": {
                "label": "spring"
            },
            "autumn": {
                "label": "autumn"
            },
            "summer": {
                "label": "summer"
            },
            "winter": {
                "label": "winter"
            }
        },
        "periods": {
            "day": {
                "label": "day"
            },
            "dusk": {
                "label": "evening"
            },
            "night": {
                "label": "night"
            }
        }
    }
}
```
图片命名

> 秋季白天的背景

    bg autumn day.png

## 配置WallpaperEngine-WebTemplate

WallpaperEngine-WebTemplate的配置在`/static/config.json`中进行修改。

## layer

> layer中存放着图层信息，图层按顺序叠加，背景图层固定命名为`background`其他图层不限制命名。

- file
	图层图片文件命名。
- type
	图层图片文件类型。
- parallax
	图层视差幅度，取值在`0-1`之间，关闭视差可使用`false`
- class
	图层附件样式。
```json:
"class": {
            "width": "52vw",
            "margin-left": "62vw"
        }
```

- src
	图层图片文件路径，使用src属性的图层`file`和`type`属性不再生效，`common`中的`Season`和`periods`不会对图层产生影响。

## common

> common中存放着模板通用配置信息，这些信息通常不需要更改。

### Season
Season中记录着季节切换的月份和图层中季节的文件命名标签

- label
	图层文件命名标签。
- months -> start
	当前季节开始月份。
- months -> end
	当前季节结束月份。

### periods
periods中记录着日出日落的图层文件命名标签和时间偏移值

- label
	图层文件命名标签。
- benchmarks
	基于日出或日落偏移时间，可取值：日出`sunrise`；日落 `sunset`；。
- deviation
	偏移时间，按分钟计算。

### effect
effect中记录着其他效果功能的配置

#### clock
- parallax
	时间跟随背景视差开关。
	
#### particle
- display
	粒子效果显示开关。


## 配置WallpaperEngine自定义项

所有WallpaperEngine在project.json文件中进行配置，正常情况下你只需要修改properties中的默认值或删除掉不需要的功能。

### Parallax
Parallax用于控制视差功能，这是个全局开关，图层的视差参数需在config.json中修改。

Value: _boolean_  
Default: _true_

### clock1
clock1用于控制时间显示。

Value: _boolean_  
Default: _true_

### clock2
clock2用于控制时间的 十二小时制 二十四小时制 切换，默认为十二小时制。

Value: _boolean_  
Default: _true_

### clockx
clockx用于控制时间在屏幕上X轴位置坐标。

Value: _slider_  
Max: _100_
Min: _0_
Default: _10_

### clockx
clocky用于控制时间在屏幕上Y轴位置坐标。

Value: _slider_  
Max: _100_
Min: _0_
Default: _42_

### region
region用于设置用户所在地区，模板根据地区计算日出日落时间。options中需添加地区的经纬度和时差信息。

Value: _combobox_  
Default: _北京(Beijing)_

### season
season用于设置季节切换信息，如果壁纸不需要进行季节切换可删除此项，options中配置不可修改。

Value: _combobox_  
Default: _nAuto_

