# Motion Design: averyhu.world 动效拆解

**来源**：https://averyhu.world  
**分析日期**：2026-06-10  
**技术栈**：React + Framer Motion + Tailwind CSS + 自定义 CSS Keyframes

---

## 设计原则

所有动效服务于三个目的：
- **注意力引导** — 动效不是装饰，是指引视线看向当前最重要的内容
- **空间感** — 多层视差、z-index 叠加、模糊虚化，营造深度而非平面
- **响应反馈** — 鼠标移动、点击、滚动都有即时、细腻的视觉回应

---

## 页面一：Hero（首屏）

### 1.1 网格渐变背景 (Mesh Gradient)

**效果**：深色背景上有三层径向渐变叠加，固定不动，营造「有光源从角落打过来」的立体感。

**实现**：
```css
.mesh-gradient {
  background:
    radial-gradient(ellipse at 20% 20%, rgba(6,182,212,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 60%),
    linear-gradient(135deg, #0a0a1a, #1a0a2e, #0a0a1a);
}
```
- 三层椭圆渐变，分别在左上(cyan)、右下(purple)、中心(cyan弱)
- 叠加一个 135deg 线性渐变底色
- **无动画**，纯静态背景层

### 1.2 毛玻璃卡片 (Glass Card)

**效果**：半透明卡片悬浮在背景上，hover 时微微上浮 + 放大 + 发光。

**实现**：
```css
.glass-card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(6,182,212,0.15);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.glass-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(6,182,212,0.4);
  box-shadow: 0 0 30px rgba(6,182,212,0.2), 0 20px 40px rgba(0,0,0,0.3);
}
```
- `backdrop-filter: blur(20px)` 是关键 — 模糊卡片后面的内容
- hover 时三重反馈：位移 + 缩放 + 发光边框
- easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design 标准缓出)

### 1.3 故障字效果 (Glitch Text)

**效果**：大标题（名字）出现时有 RGB 通道分离 + 片段位移的故障效果，持续约 5 秒后消失。

**实现**：
- 使用 `::before` 和 `::after` 伪元素，各自有独立的 clip-path 裁剪和位移动画
- `::before` 动画持续 3s (`glitch-1`)，`::after` 动画持续 5s (`glitch-2`)
- clip-path 用 `inset()` 裁剪出不同高度的横条，模拟 CRT 屏幕撕裂
- 动画结束时 `opacity: 0`，故障效果消失，露出清晰的原始文字

```css
.glitch-wrapper::before {
  animation: glitch-1 3s ease-out forwards;
  z-index: -1;
}
.glitch-wrapper::after {
  animation: glitch-2 5s ease-out forwards;
  z-index: -2;
}
@keyframes glitch-1 {
  0%   { transform: translate(-5px); opacity: 0.8; clip-path: inset(20% 0 60% 0); }
  20%  { transform: translate(5px);  clip-path: inset(40% 0 30% 0); }
  ...
  100% { transform: translate(0);    opacity: 0; }
}
```

**关键设计决策**：
- 两个伪元素用不同的动画时长（3s vs 5s），避免节奏一致看起来像循环
- `z-index: -1 / -2` 确保故障层在文字下方，不遮挡可读性
- `forwards` 填充模式让故障消失后不回来

### 1.4 呼吸发光 (Breathing Glow)

**效果**：头像/核心元素周围有缓慢呼吸的发光晕，3 秒一个周期。

**实现**：
```css
@keyframes breathe-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.2); }
  50%      { box-shadow: 0 0 40px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.2); }
}
.breathing-glow {
  animation: breathe-glow 3s ease-in-out infinite;
}
```
- `ease-in-out` 让亮度变化平滑过渡
- 两个阴影叠加（40px + 60px），产生光晕扩散的层次感

### 1.5 霓虹边框 (Neon Border)

**效果**：卡片边框是渐变的霓虹线，hover 时变亮。

**实现**：
- 用 `::before` 伪元素 + 渐变背景 + mask 裁剪形成 1px 渐变边框
- 默认 `opacity: 0.5`，hover 时 `opacity: 1`

```css
.neon-border::before {
  background: linear-gradient(135deg, cyan, transparent, cyan-dim);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.neon-border:hover::before { opacity: 1; }
```

### 1.6 点击涟漪 (Ripple)

**效果**：页面任意位置点击，从点击点扩散出一个光圈。

**实现**：
- 监听 click 事件，在点击坐标创建 `<div class="ripple">`
- CSS animation 从 0 扩散到 300px + opacity 消退

```css
@keyframes ripple-expand {
  0%   { width: 0; height: 0; opacity: 0.4; }
  100% { width: 300px; height: 300px; opacity: 0; }
}
```
- 用 `position: fixed` 定位在视口坐标
- `animation: ripple-expand 0.8s ease-out forwards` 播完自动消失

### 1.7 3D 倾斜卡片 (Tilt Card)

**效果**：鼠标在卡片上移动时，卡片向鼠标方向微微倾斜，同时有一个跟随鼠标的径向高光。

**实现**：
- JS 监听 `mousemove`，计算鼠标在卡片内的相对位置
- 用 CSS `transform-style: preserve-3d; perspective: 800px` 启用 3D 空间
- 高光层使用 `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ...)` 动态跟随

```css
.tilt-card {
  transform-style: preserve-3d;
  perspective: 800px;
}
.tilt-card-highlight {
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255,255,255,0.08) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.35s;
}
.tilt-card:hover .tilt-card-highlight { opacity: 1; }
```

### 1.8 闪烁扫光 (Shimmer)

**效果**：卡片上有一道从左到右扫过的光带，循环播放。

**实现**：
```css
.shimmer-effect::after {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shimmer 2s linear infinite;
}
@keyframes shimmer {
  0%   { left: -100%; }
  100% { left: 100%; }
}
```
- 2 秒线性循环，速度恒定
- 光带宽度由 `left` 从 -100% 到 100% 控制

---

## 页面一：滚动触发

### 2.1 滚动渐显 (Scroll Reveal)

**效果**：元素进入视口时从下方 30px 淡入上移。

**实现**：
- IntersectionObserver 监听 `.reveal` 元素
- 进入视口时添加 `.visible` 类
- 支持 `.stagger-1` 到 `.stagger-6` 的延迟级联

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
.stagger-1 { transition-delay: 0.1s; }
.stagger-2 { transition-delay: 0.2s; }
...
```

### 2.2 时间轴滑入 (Timeline Slide)

**效果**：时间轴左右两侧的卡片分别从中心向外滑入。

**实现**：
- 使用 CSS `animation-timeline: view()` — 基于滚动位置的动画（现代 CSS 特性）
- 左侧卡片从右滑入，右侧卡片从左滑入

```css
@keyframes slideInFromCenterLeft {
  0%   { opacity: 0; transform: translate(30px) scale(0.9); }
  100% { opacity: 1; transform: translate(0) scale(1); }
}
.timeline-card-left {
  animation: slideInFromCenterLeft 0.5s ease-out;
  animation-timeline: view();
  animation-range: entry 0% cover 50%;
}
```
- `animation-range: entry 0% cover 50%` — 元素从进入视口到覆盖 50% 位置之间完成动画
- 不需要 JS，纯 CSS 驱动

---

## 全局动效

### 3.1 自定义滚动条

```css
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, cyan-dim, cyan);
  border-radius: 4px;
}
```

### 3.2 平滑滚动

```css
html { scroll-behavior: smooth; }
```

### 3.3 光晕背景层

每个 section 背景有多层固定 blur 光斑：
```html
<div class="absolute blur-[100px] bg-neon-cyan/10 w-[700px] h-[700px] -top-[200px] -left-[300px]" />
<div class="absolute blur-[130px] bg-neon-purple/20 w-[800px] h-[800px] -right-[200px]" />
```
- 大尺寸（700-900px）+ 大 blur（100-130px）+ 低透明度（10-20%）
- 无动画，纯静态氛围层

---

## 动效层级总结

| 层级 | 动效 | 触发方式 | 技术 |
|------|------|---------|------|
| 1-背景 | Mesh 渐变 | 无（静态） | CSS radial-gradient |
| 1-背景 | 光晕斑点 | 无（静态） | CSS blur |
| 2-首屏 | 故障字 | 页面加载自动播放 | CSS @keyframes |
| 2-首屏 | 呼吸发光 | 页面加载循环 | CSS @keyframes infinite |
| 2-首屏 | 闪烁扫光 | 页面加载循环 | CSS @keyframes infinite |
| 3-交互 | 毛玻璃 hover | 鼠标悬停 | CSS transition |
| 3-交互 | 霓虹边框 hover | 鼠标悬停 | CSS transition |
| 3-交互 | 3D 倾斜 | 鼠标移动 | JS mousemove + CSS 3D |
| 3-交互 | 点击涟漪 | 鼠标点击 | JS click + CSS @keyframes |
| 4-滚动 | 渐显 + 级联 | 元素进入视口 | IntersectionObserver + CSS |
| 4-滚动 | 时间轴滑入 | 元素进入视口 | CSS animation-timeline |
| 5-全局 | 滚动条 | 滚动 | CSS ::-webkit-scrollbar |
| 5-全局 | 平滑滚动 | 锚点跳转 | CSS scroll-behavior |

---

## 可复用到个人网站的动效（优先级排序）

1. **毛玻璃卡片 hover** — 改动最小，效果明显。你当前的卡片 hover 可以加上 `translateY(-2px)` + `box-shadow`
2. **滚动渐显 + 级联** — 你已经移除了 Framer Motion 的 AnimatePresence，可以用纯 CSS 的 `.reveal` + IntersectionObserver 替代
3. **网格渐变背景** — 替换当前的单一 blur 光斑，用 2-3 层不同位置的 radial-gradient 叠加，更有层次
4. **霓虹边框** — 你的项目卡片（cyan/purple/warm）已经有颜色主题，加上渐变边框 hover 会很惊艳
5. **呼吸发光** — hero 头像或核心数字加 pulsing glow
6. **故障字** — hero 名字的入场效果（用一次，不滥用）
7. **点击涟漪** — 全局点缀
8. **3D 倾斜卡片** — 对项目卡片 grid 使用，但要注意性能
9. **CSS animation-timeline** — 时间轴滑入，但兼容性有限（Chrome/Edge 115+）
