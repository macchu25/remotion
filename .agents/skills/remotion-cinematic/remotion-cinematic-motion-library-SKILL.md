# Remotion Cinematic Motion Library — SKILL.md

## 1. Mục tiêu

Skill này hướng dẫn AI tạo video Remotion có cảm giác được đạo diễn thủ công: chuyển động có lý do, transition nối ý, camera có chủ đích, typography dễ đọc, SFX đồng bộ, và tránh cảm giác "AI slideshow".

Ưu tiên:
1. Ý nghĩa trước hiệu ứng.
2. Chuyển động phục vụ nội dung.
3. Mỗi cảnh phải có điểm nhìn rõ ràng.
4. Dùng lại hệ thống animation, không lặp lại cảm giác.
5. Có thể render cùng source cho `vi` và `en`.

---

## 2. Luật cốt lõi

### 2.1 Semantic transition
Không chọn transition ngẫu nhiên chỉ vì đẹp. Hãy tìm vật thể/ý niệm chung giữa cảnh A và B.

Ví dụ:
- Số 0 → vòng tròn → quỹ đạo hành tinh.
- Dòng chữ trên giấy → zoom vào một ký tự → ký tự trở thành đồ họa cảnh sau.
- Bản thảo cổ → các nét mực biến thành đường mạch điện.
- Hệ tọa độ → grid mở rộng thành không gian 3D.
- Con số → pixel → transistor → chip.

### 2.2 Motion hierarchy
Mỗi shot chỉ có 1 chuyển động chính. Các chuyển động phụ phải nhẹ hơn.

Thứ tự ưu tiên:
`Subject > Camera > Supporting graphics > Background particles`

Không để mọi thứ cùng bay, scale, rotate và glow.

### 2.3 Timing
Ở 30fps:
- Micro animation: 6–15 frames.
- Text reveal: 12–30 frames.
- Normal transition: 15–30 frames.
- Hero transition: 30–60 frames.
- Establishing shot: 60–150 frames.

Không kéo dài transition nếu nó không truyền thêm thông tin.

### 2.4 Easing
Ưu tiên chuyển động vật lý:
- `spring()` cho object vào/ra tự nhiên.
- ease-out cho xuất hiện.
- ease-in cho biến mất.
- ease-in-out cho camera.
- linear chỉ dùng cho đồng hồ, timeline, data stream, rotation liên tục.

Tránh bounce quá mạnh trừ nội dung vui nhộn.

### 2.5 Continuity
Nếu object ở cảnh A được dùng để chuyển sang B, giữ:
- vị trí tương đối,
- hướng chuyển động,
- màu/độ sáng,
- scale,
- vector chuyển động

trong vài frame đầu cảnh B.

---

# 3. Intro / Opening Effects

## FX-001 — Book Cover Reveal
**Dùng:** lịch sử, kiến thức, storytelling.
**Animation:** sách xuất hiện ở góc 3/4; shadow tăng dần; camera dolly-in nhẹ.
**Timing:** 30–60f.
**SFX:** book placement + subtle room tone.
**Không dùng:** chủ đề cyber/futuristic nếu không có lý do kể chuyện.

## FX-002 — Book Opening
Bìa xoay quanh spine với perspective 3D; các trang dưới bìa có độ trễ nhỏ.
SFX: hardcover creak + paper movement.

## FX-003 — Hero Page Flip
Trang cong trước khi lật; mép trang đi nhanh hơn vùng gần gáy; shadow chạy theo fold.
SFX: page flip có transient rõ.

## FX-004 — Rapid Page Search
Lật 4–10 trang nhanh, tốc độ giảm dần trước trang mục tiêu.
Dùng để tạo cảm giác "đi tìm câu trả lời".

## FX-005 — Zoom Into Page
Camera tiến vào một hình/số/chữ trên trang; texture giấy biến mất khi graphic chiếm full frame.
Transition nên match-scale với cảnh tiếp theo.

## FX-006 — Ink Title Write
Mực lan theo stroke thay vì opacity fade đơn giản.
Có feather nhẹ ở đầu nét.
SFX: fountain pen / scratch.

## FX-007 — Ancient Manuscript Reveal
Ánh sáng quét qua giấy cũ; nội dung xuất hiện theo vùng được chiếu.
Không spam sepia/filter.

## FX-008 — Scroll Unroll
Cuộn giấy mở theo trục dọc/ngang; nội dung bị mask theo phần giấy mở.
SFX: parchment roll.

## FX-009 — Chalkboard Start
Camera từ bảng tối → một nét phấn xuất hiện → công thức tự viết.
SFX: chalk contact + tiny dust impact.

## FX-010 — Object-on-Desk Intro
Một vật liên quan chủ đề rơi/được đặt lên bàn; camera follow; title xuất hiện từ vật thể.

---

# 4. Page / Paper / Writing

## FX-011 — Single Page Turn
## FX-012 — Page Corner Curl
## FX-013 — Torn Paper Reveal
## FX-014 — Paper Slide Overlay
## FX-015 — Sticky Note Pop
## FX-016 — Typewriter Reveal
## FX-017 — Handwritten Stroke
## FX-018 — Underline Sweep
## FX-019 — Marker Highlight
## FX-020 — Ink Bleed
## FX-021 — Stamp Impact
## FX-022 — Paper Fold
## FX-023 — Blueprint Unfold
## FX-024 — Document Stack Shuffle
## FX-025 — Margin Annotation

**Luật paper:** luôn có thickness/shadow/parallax tối thiểu. Không animate giấy như một rectangle phẳng nếu shot cận.

---

# 5. Mathematics Motion

## FX-026 — Equation Write-On
Render công thức theo nhóm logic, không reveal từng ký tự vô nghĩa.

## FX-027 — Equation Morph
Giữ các token không đổi tại vị trí gần nhau; token bị biến đổi move/fade/morph.
Ví dụ `x + 3 = 7` → `x = 4`.

## FX-028 — Cancellation Strike
Gạch bỏ hai thành phần đồng thời với SFX pencil/chalk tick.

## FX-029 — Number Counter
Số chạy nhanh rồi decelerate vào đáp án. Không dùng cho giá trị cần người xem theo dõi từng bước.

## FX-030 — Number Line Travel
Camera/object di chuyển trên number line; tick quan trọng scale nhẹ khi đi qua.

## FX-031 — Number Line Zoom
Zoom từ số nguyên → phân số → số thập phân để minh họa mật độ.

## FX-032 — Prime Number Sieve
Grid số; composite fade; prime giữ sáng.

## FX-033 — Factor Split
Một số tách thành các factor blocks rồi tái tổ hợp.

## FX-034 — Fraction Slice
Shape bị chia trực quan thành phần bằng nhau.

## FX-035 — Decimal Expansion Stream
Digits sinh ra liên tục và chạy vào chiều sâu; dùng cho irrational/infinite expansion.

## FX-036 — Infinity Loop Trace
Stroke vẽ ∞ rồi camera follow theo đường cong.

## FX-037 — Zero Circle Morph
`0` morph thành vòng tròn, bánh xe, quỹ đạo, aperture... tùy semantic bridge.

## FX-038 — Operator Transform
`+ − × ÷ =` trở thành graphic/đường nối phù hợp cảnh tiếp theo.

## FX-039 — Coordinate Grid Build
Axes xuất hiện trước, ticks sau, grid cuối; tránh hiện tất cả cùng lúc.

## FX-040 — Function Plot Draw
Graph được vẽ theo x tăng dần; camera chỉ follow nếu cần nhấn hành vi.

## FX-041 — Area Fill
Sau khi curve hoàn thành, vùng diện tích fill từ baseline.

## FX-042 — Geometric Construction
Compass/line/circle xuất hiện theo đúng thứ tự xây dựng toán học.

## FX-043 — Shape Decomposition
Polygon tách thành tam giác/khối đơn giản để chứng minh diện tích.

## FX-044 — Proof Step Focus
Bước hiện tại full contrast; bước cũ giảm contrast nhưng vẫn giữ context.

## FX-045 — Matrix Populate
Rows/columns xuất hiện có logic; không random cascade nếu đang giải thích phép nhân ma trận.

## FX-046 — Matrix Transform
Highlight row × column → products → sum → output cell.

## FX-047 — Vector Arrow Launch
Arrow grow từ origin đến endpoint; magnitude/angle labels follow.

## FX-048 — Probability Branch
Tree mọc theo từng quyết định; branch không liên quan dim.

## FX-049 — Set/Venn Morph
Circles move/overlap để thể hiện union/intersection/complement.

## FX-050 — Mathematical Explosion
Một biểu thức tách thành token bay ra để chuyển cảnh. Chỉ dùng ở điểm cao trào.

---

# 6. Geometry / Spatial Effects

## FX-051 — Point → Line → Plane
Điểm xuất hiện → kéo thành line → line sweep thành plane.

## FX-052 — 2D → 3D Extrusion
Shape phẳng được extrude thành khối; camera orbit rất nhẹ.

## FX-053 — Polygon Morph
Giữ centroid ổn định; vertices interpolate.

## FX-054 — Circle Construction
Radius line quay quanh center để sinh circle.

## FX-055 — Grid Warp
Cartesian grid biến dạng theo function/space concept.

## FX-056 — Perspective Tunnel
Grid tiến vào vanishing point; dùng để chuyển sang scale/space/depth.

## FX-057 — Golden Ratio Build
Rectangles/circles xuất hiện tuần tự, không reveal spiral trước cấu trúc.

## FX-058 — Tessellation Growth
Pattern nhân từ một tile ra toàn frame.

## FX-059 — Fractal Dive
Zoom có giới hạn; nên dùng precomputed layers để tránh render nặng.

## FX-060 — Topology Stretch
Shape biến dạng nhưng giữ đặc tính cần giải thích.

---

# 7. History / Civilization

## FX-061 — Timeline Draw
Line chạy theo thời gian; milestones bật khi playhead đi qua.

## FX-062 — Era Push
Camera đi ngang qua các "mốc thời gian" như không gian vật lý.

## FX-063 — Clay Tablet Engraving
Glyph được khắc bằng displacement/shadow giả lập.

## FX-064 — Stone Carving Reveal
Light grazing làm nổi inscription.

## FX-065 — Papyrus to Paper
Texture morph + edge transition, dùng để nối các thời đại ghi chép.

## FX-066 — Manuscript to Print
Handwriting align → letters snap thành movable type.

## FX-067 — Printing Press Impact
Text/object bị "đóng" vào frame theo nhịp máy.

## FX-068 — Map Line Journey
Đường lan từ nơi A sang B để kể sự truyền bá ý tưởng. Không giả bản đồ chính xác nếu dữ liệu không có.

## FX-069 — Artifact Spotlight
Background dim; key artifact sáng lên; camera push-in 3–6%.

## FX-070 — Date Slam
Năm quan trọng xuất hiện lớn trong 8–15f rồi settle nhỏ vào timeline.

---

# 8. Digital / Computer / Future

## FX-071 — Pixel Dissolve
Object phân rã thành pixel có hướng, không random noise hoàn toàn.

## FX-072 — Binary Conversion
Text/numbers biến thành bits theo block.

## FX-073 — Data Stream
Rows/particles chạy theo đường dẫn; dùng background với opacity thấp.

## FX-074 — Circuit Trace
Line chạy qua PCB-like network rồi kích hoạt nodes.

## FX-075 — Transistor Switch
Gate signal → state change → output pulse.

## FX-076 — Logic Gate Flow
Signal có màu/brightness state chạy qua AND/OR/NOT.

## FX-077 — Chip Zoom-In
Camera tiến vào chip → die → transistor abstraction.

## FX-078 — Chip Zoom-Out
Từ transistor → die → package → computer/device.

## FX-079 — Terminal Build
Code/text xuất hiện theo chunks; tránh "hacker typing" nếu nội dung không liên quan.

## FX-080 — Controlled Glitch
1–4 frame RGB/position displacement ở transition mạnh.
Không để glitch liên tục.

## FX-081 — Scanline Reveal
Một scan beam reveal cấu trúc kỹ thuật.

## FX-082 — Holographic Assembly
Layers assemble theo depth; dùng tiết chế.

## FX-083 — Network Propagation
Node đầu phát pulse → neighbors → network.

## FX-084 — Data Compression
Nhiều blocks thu vào một packet/file/icon.

## FX-085 — Data Decompression
Ngược lại FX-084; object reconstruct theo hierarchy.

---

# 9. Camera Language

## FX-086 — Slow Push-In
Scale/camera 100→105% trong 2–5s để tăng tập trung.

## FX-087 — Slow Pull-Out
Reveal context sau khi người xem hiểu chi tiết.

## FX-088 — Whip Pan
Fast directional blur + scene B tiếp tục cùng vector.
Không dùng liên tục.

## FX-089 — Match Zoom
Zoom vào object A và ra từ object B có hình tương tự.

## FX-090 — Orbit
Chỉ dùng khi depth mang thông tin.

## FX-091 — Parallax Push
Foreground/midground/background di chuyển khác tốc độ.

## FX-092 — Rack Focus Simulation
Blur foreground→background hoặc ngược lại để đổi điểm chú ý.

## FX-093 — Camera Follow
Theo một token, line, particle hoặc object có vai trò dẫn chuyện.

## FX-094 — Crash Zoom
Zoom rất nhanh để nhấn bất ngờ; 6–12f.

## FX-095 — Top-Down Transition
Camera rotate/translate thành top-down diagram.

---

# 10. Text / Typography

## FX-096 — Word-by-Word Emphasis
Chỉ animate keyword, không animate mọi từ.

## FX-097 — Kinetic Keyword
Keyword scale/position theo nghĩa: "expand", "fall", "split", "rotate".

## FX-098 — Masked Text Reveal
Text reveal qua mask có hướng liên quan motion cảnh.

## FX-099 — Text Track-In
Letter spacing rộng → normal. Dùng title ngắn.

## FX-100 — Text Compression
Letters converge để biểu diễn compression/density.

## FX-101 — Character Scatter
Chữ tách thành characters; dùng transition, không dùng đoạn cần đọc.

## FX-102 — Definition Card
Term → short definition → visual example. Giữ card ổn định đủ lâu để đọc.

## FX-103 — Quote Focus
Một đoạn ngắn, keyword highlight. Không animate quá nhiều.

## FX-104 — Label Attach
Label nối bằng line/callout và follow object.

## FX-105 — Dynamic Subtitle Emphasis
Nếu có captions baked-in, highlight tối đa 1–3 từ trọng tâm mỗi phrase.

---

# 11. Conceptual / Match Transitions

## FX-106 — Shape Match Cut
Object A và B có silhouette gần nhau.

## FX-107 — Color Match Cut
Một vùng màu/ánh sáng ở A mở rộng thành background B.

## FX-108 — Motion Match Cut
Object rời frame cùng tốc độ/hướng object B đi vào.

## FX-109 — Scale Match Cut
Chi tiết cực nhỏ trở thành vật thể cực lớn hoặc ngược lại.

## FX-110 — Symbol-to-World
Ký hiệu toán học morph thành vật thể thực/abstract world.

## FX-111 — Diagram-to-Reality
Diagram zoom/morph thành scene trực quan.

## FX-112 — Reality-to-Diagram
Scene phức tạp simplify thành lines/shapes.

## FX-113 — Line Continuation
Một line từ scene A tiếp tục chạy và "vẽ" scene B.

## FX-114 — Circle Portal
Circle có sẵn expand thành mask scene B.

## FX-115 — Equation Portal
Camera zoom xuyên qua một operator/digit để sang concept tiếp.

---

# 12. Micro Motion

## FX-116 — Cursor Blink
## FX-117 — Pointer Tap
## FX-118 — Tiny Scale Pulse
## FX-119 — Node Ping
## FX-120 — Line Draw
## FX-121 — Dot Travel
## FX-122 — Highlight Sweep
## FX-123 — Subtle Float
## FX-124 — Dust Particles
## FX-125 — Ink Particle
## FX-126 — Chalk Dust
## FX-127 — Paper Fiber Drift
## FX-128 — Screen Flicker
## FX-129 — Light Sweep
## FX-130 — Focus Ring

Micro-motion phải hỗ trợ focus. Không chạy tất cả cùng lúc.

---

# 13. Impact / Reveal

## FX-131 — Hard Cut + Impact
Dùng khi câu trả lời/đảo ngược quan niệm xuất hiện.

## FX-132 — Flash Frame
1–2f sáng nhẹ trước impact. Không dùng thường xuyên.

## FX-133 — Shockwave
Ring expand + displacement nhẹ.

## FX-134 — Fragment Assemble
Pieces tụ lại thành answer/object.

## FX-135 — Fragment Break
Object vỡ để chuyển từ certainty → complexity.

## FX-136 — Curtain Mask
Hai mask tách/mở theo trục.

## FX-137 — Iris Reveal
Circle aperture mở/đóng.

## FX-138 — Light-to-Scene
Nguồn sáng tăng đến full frame rồi resolve scene mới.

## FX-139 — Shadow Reveal
Object được nhận diện trước qua bóng rồi mới thấy subject.

## FX-140 — Negative Space Reveal
Các object di chuyển để khoảng trống tạo thành chữ/symbol.

---

# 14. Charts / Data Visualization

## FX-141 — Bar Grow
Grow từ baseline, labels settle sau bar.

## FX-142 — Line Chart Draw
Line draw theo thời gian; point chỉ xuất hiện khi line đến.

## FX-143 — Pie/Radial Build
Chỉ dùng khi part-to-whole thật sự phù hợp.

## FX-144 — Ranking Reorder
Items spring nhẹ tới vị trí mới, giữ object identity.

## FX-145 — Counter + Context
Counter phải đi cùng unit/visual context.

## FX-146 — Comparison Split
Hai bên frame có cùng scale/layout để so sánh công bằng.

## FX-147 — Before/After Wipe
Wipe có handle giả lập hoặc line separator.

## FX-148 — Heatmap Populate
Cells xuất hiện theo data order, không random nếu thứ tự có ý nghĩa.

## FX-149 — Scatter Plot Populate
Points xuất hiện theo group hoặc time.

## FX-150 — Data-to-Object
Chart element morph thành object đại diện cho kết luận.

---

# 15. SFX System

Không dùng cùng một `whoosh.mp3` cho mọi transition.

### Categories
- PAPER: flip, rustle, fold, tear, stamp, pen, pencil.
- MATH: chalk, tick, snap, soft pop, marker.
- CAMERA: airy whoosh, low sweep, reverse swell.
- IMPACT: thump, hit, sub impact, click.
- DIGITAL: bit, glitch, UI tick, relay, data pulse.
- HISTORICAL: stone scrape, engraving, wood, parchment.
- SCIENCE: glass tick, electrical pulse, mechanical click.
- AMBIENCE: room, archive, lab, digital hum.

### SFX selection
Chọn theo vật liệu và động tác:
`paper turns → paper sound`
không phải
`transition exists → generic whoosh`.

### Layering
Hero action tối đa thường:
1. primary material sound
2. soft movement layer
3. optional low impact

Tránh 5–6 SFX chồng nhau.

### Variation
Nếu cùng action xuất hiện nhiều lần:
- alternate samples,
- pitch ±2–5%,
- gain variation nhẹ,
- offset transient vài frame.

Không random đến mức mất consistency.

---

# 16. Scene Director Rules

Trước mỗi scene, AI phải xác định:

```text
PURPOSE: Người xem cần hiểu điều gì?
FOCUS: Vật thể nào quan trọng nhất?
ENTRY: Scene xuất hiện bằng cách nào?
MAIN MOTION: Chuyển động chính?
SUPPORT MOTION: Có cần không?
EXIT: Scene nối sang scene tiếp theo bằng cái gì?
SFX: Vật liệu/hành động tạo âm thanh nào?
```

Nếu không trả lời được `PURPOSE`, không thêm animation.

---

# 17. Transition Selection Algorithm

1. Đọc scene hiện tại và scene tiếp theo.
2. Tìm shared concept:
   - shape
   - object
   - number
   - word
   - line
   - color
   - direction
   - historical object
   - scale relationship
3. Nếu có shared concept → ưu tiên match transition.
4. Nếu không → dùng camera/paper/simple mask.
5. Hero transition chỉ dùng ở:
   - mở chương,
   - discovery,
   - twist,
   - major era change,
   - climax.
6. Không dùng cùng transition nổi bật trong 3 cảnh gần nhau.
7. Không dùng quá 2 hero effects trong ~30 giây trừ montage.

---

# 18. Anti-Repetition System

Theo dõi lịch sử:

```ts
type MotionHistory = {
  lastTransitions: string[];
  lastCameraMoves: string[];
  lastSfxCategories: string[];
  lastTextReveals: string[];
}
```

Penalty khi:
- effect giống nhau trong 3 scene,
- camera direction giống nhau quá lâu,
- mọi title đều scale-up,
- mọi scene đều zoom-in,
- mọi transition đều whoosh.

Có thể reuse subtle motion; hạn chế reuse signature motion.

---

# 19. Remotion Implementation Guidelines

### Frame-driven
Animation phải phụ thuộc `useCurrentFrame()` và `useVideoConfig()`.

```ts
const frame = useCurrentFrame();
const {fps} = useVideoConfig();

const progress = interpolate(
  frame,
  [0, fps],
  [0, 1],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }
);
```

### Spring
```ts
const enter = spring({
  frame,
  fps,
  config: {
    damping: 18,
    stiffness: 120,
    mass: 0.8,
  },
});
```

Không copy một spring config cho mọi object.

### Composition
Tách:
- `Scene`
- `Transition`
- `Camera`
- `Typography`
- `Sfx`
- `Background`
- `MathVisual`

Không viết toàn bộ video thành một component khổng lồ.

### Determinism
Không dùng `Math.random()` trực tiếp cho visual.
Dùng seeded randomness để render lại giống nhau.

### Performance
- Tránh hàng nghìn DOM nodes.
- Particle count có giới hạn.
- Precompute geometry nếu phức tạp.
- Dùng CSS transform/opacity khi có thể.
- Chỉ blur khi thực sự cần.
- Cẩn thận với nhiều shadow/filter trên video dài.

---

# 20. Localization: VN + Global

Source phải tách nội dung khỏi animation.

```ts
const copy = {
  vi: {
    title: "Tại sao không thể chia cho 0?",
    zero: "Số 0",
  },
  en: {
    title: "Why Can't We Divide by Zero?",
    zero: "Zero",
  },
};
```

Không hard-code text Việt vào component animation.

### Layout rules
English và Vietnamese có độ dài khác nhau:
- đo/ước lượng width,
- cho phép font-size responsive,
- title có max-width,
- hỗ trợ line break theo ngôn ngữ,
- animation mask dựa vào container thay vì số pixel cố định.

### Render
```text
language=vi → VN master
language=en → Global master
```

Animation logic giữ chung; text, voice, caption, thumbnail copy và metadata thay theo locale.

---

# 21. Opening Recipe Library

### Recipe A — Historical Book
Book cover → open → rapid pages → target page → ink title → zoom into symbol → scene 1.

### Recipe B — Equation Mystery
Black frame → one equation appears → impossible/unknown token pulses → camera enters token → visual world.

### Recipe C — Timeline
Date slam → line extends backward → milestones race past → stop at origin → begin story.

### Recipe D — Object Transformation
Hero object → simplify into geometry → geometry becomes mathematical symbol → title.

### Recipe E — Digital
Single digit → binary expansion → data stream → circuit trace → chip → title.

Không dùng cùng opening recipe cho mọi video.

---

# 22. Example Semantic Chain — "Lịch sử số 0"

```text
Book lands
→ cover opens
→ pages flip
→ ancient manuscript
→ camera finds empty placeholder
→ placeholder morphs into "0"
→ 0 becomes a circle
→ circle becomes number-line marker
→ number line expands
→ equations appear
→ equations dissolve into binary
→ binary flows into circuit traces
→ camera pulls out to reveal chip
```

Đây là một chuỗi có logic hình ảnh; không phải danh sách transition ngẫu nhiên.

---

# 23. Example Semantic Chain — "Prime Numbers"

```text
Number grid
→ composite numbers crossed out
→ primes remain
→ primes detach from grid
→ dots form distribution
→ distribution becomes graph
→ one prime enlarges
→ digits transform into lock pins
→ lock becomes encryption metaphor
→ circuit/network scene
```

Nếu video giải thích cryptography, phải giải thích cơ chế bằng visual; không chỉ ném thuật ngữ "RSA" lên màn hình.

---

# 24. Quality Gate

Trước khi render, kiểm tra:

- [ ] 3 giây đầu có visual hook.
- [ ] Người xem biết nên nhìn đâu ở mọi shot.
- [ ] Không có text quan trọng biến mất quá nhanh.
- [ ] Transition lớn có lý do semantic.
- [ ] Không lặp signature effect quá gần nhau.
- [ ] Camera không di chuyển vô nghĩa.
- [ ] SFX đúng vật liệu/hành động.
- [ ] Không dùng generic whoosh cho mọi thứ.
- [ ] Math animation phản ánh đúng phép biến đổi.
- [ ] Scene lịch sử không giả dữ kiện chỉ để đẹp.
- [ ] VN/EN không hard-code layout.
- [ ] Text dài không overflow.
- [ ] Animation deterministic.
- [ ] Render performance hợp lý.
- [ ] Có visual payoff ở các điểm quan trọng.
- [ ] Outro không phá nhịp kết luận.

---

# 25. AI Output Contract

Khi AI lập kế hoạch scene, output tối thiểu:

```ts
type ScenePlan = {
  id: string;
  purpose: string;
  durationFrames: number;
  focus: string;
  visual: string;
  entryEffect: string;
  mainAnimation: string;
  camera: string;
  textAnimation: string;
  sfx: string[];
  exitEffect: string;
  semanticBridgeToNext: string;
};
```

Không được ghi mơ hồ:
- "add cool animation"
- "nice transition"
- "cinematic effect"
- "add some particles"

Phải mô tả được object nào chuyển động, từ đâu tới đâu, trong bao nhiêu frame, vì sao chuyển động đó hỗ trợ nội dung.

---

# 26. Golden Rule

> Animation không phải trang trí cho lời kể. Animation chính là một phần của lời kể.

Nếu bỏ animation đi mà ý nghĩa vẫn hoàn toàn giống nhau, hãy tự hỏi hiệu ứng đó có thực sự cần thiết hay không.
