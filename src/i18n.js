// PoseWear interface localization. Catalog/model prompt language stays separate.
(() => {
  const TEXT = {
    '跳到内容':['Skip to content','Ruka hadi maudhui'], '搜索':['Search','Tafuta'], '清除搜索':['Clear search','Futa utafutaji'],
    '搜姿势、颜色、单品':['Search poses, colours, items','Tafuta mikao, rangi, vitu'], '搜姿势名、系列、分类':['Search poses, series, categories','Tafuta mikao, mfululizo, aina'],
    '栏目':['Sections','Sehemu'], '描述语言':['Interface language','Lugha ya kiolesura'], '快捷键帮助':['Keyboard shortcuts','Njia za mkato'],
    '显示成人向内容（18+）':['Show adult references (18+)','Onyesha marejeleo ya watu wazima (18+)'], '成人向内容，默认关闭':['Adult references are off by default','Marejeleo ya watu wazima yamezimwa kwa kawaida'],
    '快捷键（?）':['Keyboard shortcuts (?)','Njia za mkato (?)'], '不再显示这条说明':["Don't show this again",'Usionyeshe tena'], '关闭公告':['Dismiss announcement','Funga tangazo'], '排序':['Sort','Panga'],
    '切换深浅色':['Toggle colour theme','Badili mandhari'], '切换深浅色（T）':['Toggle theme (T)','Badili mandhari (T)'], '关闭（Esc）':['Close (Esc)','Funga (Esc)'], 'GitHub 开源仓库':['GitHub source repository','Hifadhi ya chanzo ya GitHub'],
    '姿势':['Poses','Mikao'], '深度姿势':['Depth poses','Mikao ya kina'], '服装':['Outfits','Mavazi'], '动画服装':['Anime outfits','Mavazi ya anime'],
    '人像':['Portraits','Picha za uso'], '表情':['Expressions','Mionekano ya uso'], '发型':['Hair','Nywele'], '历代':['Historical','Kihistoria'],
    '场景':['Scenes','Mandhari'], '光影':['Lighting','Mwangaza'], '道具':['Props','Vifaa'], '家具':['Furniture','Samani'],
    '试穿':['Studio','Studio'], '收藏':['Favourites','Vipendwa'], '最近':['Recent','Za hivi karibuni'],
    '画画、拍照、出图时用的参考':['References for drawing, photography and image generation','Marejeleo ya kuchora, kupiga picha na kutengeneza picha'],
    '姿势和服装':['Pose and outfit','Mikao na mavazi'], '参考图':['references','marejeleo'],
    '每个姿势有多个角度，每套服装都附中英文描述。可以收藏、组合，也能上传自己的照片试穿。':['Browse multiple angles, save and combine references, or upload a photo in the try-on studio.','Vinjari pembe nyingi, hifadhi na unganisha marejeleo, au pakia picha katika studio ya majaribio.'],
    '组姿势':['pose sets','seti za mikao'], '张角度图':['angle images','picha za pembe'], '套服装':['outfits','mavazi'], '套动画服装':['anime outfits','mavazi ya anime'],
    '张人像':['portraits','picha za uso'], '条表情':['expressions','mionekano'], '套历代服饰':['historical outfits','mavazi ya kihistoria'],
    '非官方汉化':['CC0','CC0'], '素材来自':['Source:','Chanzo:'], '，作者':[' · author ', ' · mwandishi '], '来源':['Source','Chanzo'],
    '人像使用提示与规则':['Portrait usage tips and terms','Vidokezo na masharti ya picha za uso'],
    '在 AI 工具的「角色参考 / 脸部参考」里载入这张图即可。':['Load this image as the character or face reference in your image tool.','Pakia picha hii kama rejeleo la mhusika au uso katika zana yako ya picha.'],
    '想统一长相用「正脸」；参考服装、发质和整体氛围用「生活照」。':['Use a front-facing portrait for consistent identity; use a lifestyle portrait for clothing, hair texture and mood.','Tumia picha ya mbele kudumisha utambulisho; tumia picha ya kawaida kwa mavazi, muundo wa nywele na hali.'],
    '一直用同一张图，生成的脸会更稳定。下载原图 PNG 能保留更多细节。':['Reusing the same reference improves face consistency. Download the original PNG to retain more detail.','Kutumia rejeleo lilelile huimarisha uthabiti wa uso. Pakua PNG asili kuhifadhi maelezo zaidi.'],
    'CC0 1.0：可商用、可修改，无需署名。均为 AI 生成的虚构人物，不得用来冒充真人或用于违背公序良俗的用途。原作者希望不要把图片原样批量转载。':['CC0 1.0: commercial use and modification are allowed without attribution. These are fictional AI-generated people; do not impersonate real people or misuse them. The source asks that images not be bulk-republished unchanged.','CC0 1.0: matumizi ya kibiashara na marekebisho yanaruhusiwa bila kutaja chanzo. Hawa ni watu wa kubuni waliotengenezwa na AI; usiwaige watu halisi wala kuzitumia vibaya. Chanzo kinaomba picha zisichapishwe kwa wingi bila kubadilishwa.'],
    '个场景':['scenes','mandhari'], '种光影':['lighting references','marejeleo ya mwangaza'],
    '更多筛选':['More filters','Vichujio zaidi'], '清空全部':['Clear all','Futa yote'], '导出收藏':['Export favourites','Hamisha vipendwa'],
    '导入':['Import','Ingiza'], '清空':['Clear','Futa'], '清空记录':['Clear history','Futa historia'], '默认排序':['Default order','Mpangilio wa kawaida'],
    '编号倒序':['Newest ID first','Nambari kubwa kwanza'], '随机打乱':['Shuffle','Changanya'], '收藏优先':['Favourites first','Vipendwa kwanza'],
    '人气榜':['Popularity','Umaarufu'], '随机一个':['Random pick','Chagua bila mpangilio'], '筛选':['Filters','Vichujio'], '完成':['Done','Imekamilika'],
    '全部':['All','Zote'], '分类':['Category','Aina'], '系列':['Series','Mfululizo'], '角度':['Angle','Pembe'], '类型':['Type','Aina'],
    '发长':['Hair length','Urefu wa nywele'], '情绪':['Emotion','Hisia'], '强度':['Intensity','Nguvu'], '朝代':['Era','Enzi'], '机位':['Camera angle','Pembe ya kamera'],
    '没有找到匹配的内容':['No matching references','Hakuna marejeleo yanayolingana'], '换个关键词，或清空筛选条件试试':['Try another search or clear the filters.','Jaribu neno jingine au futa vichujio.'],
    '清空筛选':['Clear filters','Futa vichujio'], '数据加载失败':['Could not load the catalog','Imeshindikana kupakia katalogi'],
    '请检查网络后刷新页面重试':['Check your connection, then refresh and try again.','Kagua muunganisho, kisha onyesha upya na ujaribu tena.'], '重新加载':['Reload','Pakia upya'],
    '还没有收藏':['No favourites yet','Bado hakuna vipendwa'], '还没有浏览记录':['No recent items yet','Bado hakuna historia'],
    '看到喜欢的，点卡片右上角的 ♡。收藏只存在这台设备的浏览器里，可以导出备份。':['Select the heart on any card to save it on this device. You can export a backup.','Bonyeza moyo kwenye kadi yoyote kuihifadhi kwenye kifaa hiki. Unaweza kuhamisha nakala rudufu.'],
    '打开过的大图会按时间排在这里，最多保留 100 条。':['Opened references appear here by time; up to 100 are kept.','Marejeleo yaliyofunguliwa huonekana hapa kwa mpangilio wa muda; hadi 100 huhifadhiwa.'],
    '换个关键词试试，或者看看这些热门搜索：':['Try another search or one of these suggestions:','Jaribu utafutaji mwingine au mojawapo ya mapendekezo haya:'],
    '逛姿势库':['Browse poses','Vinjari mikao'], '逛深度姿势':['Browse depth poses','Vinjari mikao ya kina'], '逛服装库':['Browse outfits','Vinjari mavazi'], '逛动画服装':['Browse anime outfits','Vinjari mavazi ya anime'],
    '逛人像库':['Browse portraits','Vinjari picha za uso'], '逛表情库':['Browse expressions','Vinjari mionekano'], '逛历代服饰':['Browse historical outfits','Vinjari mavazi ya kihistoria'], '逛场景库':['Browse scenes','Vinjari mandhari'],
    '人物照片':['Person photo','Picha ya mtu'], '从人像库选':['Choose from portraits','Chagua kutoka picha za uso'], '上传人物照':['Upload a person photo','Pakia picha ya mtu'],
    '点击、拖入或粘贴':['Click, drop or paste','Bofya, buruta au bandika'], '模特类型':['Model description','Maelezo ya modeli'],
    '必选':['Required','Inahitajika'], '可选':['Optional','Si lazima'], '上传图':['Upload image','Pakia picha'], '从库中选':['Choose from library','Chagua maktabani'],
    '从动画服装选':['Choose anime outfit','Chagua vazi la anime'], '从表情库选':['Choose expression','Chagua mwonekano'], '全部角度':['All angles','Pembe zote'],
    '分开出':['Separate outputs','Matokeo tofauti'], '拼一张':['Contact sheet','Unganisha picha'], '用我的照片':['Use my photo','Tumia picha yangu'], '没有照片':['Generate a person','Tengeneza mtu'],
    '需要一个图像模型的 API Key':['An image-model API key is required','Ufunguo wa API wa modeli ya picha unahitajika'],
    '支持 OpenAI、Gemini、豆包或中转。Key 只存在你的浏览器里。':['Supports OpenAI, Gemini, Seedream and compatible relays. Your key stays in this browser.','Inatumia OpenAI, Gemini, Seedream na relay zinazooana. Ufunguo unabaki kwenye kivinjari hiki.'],
    '去设置':['Open settings','Fungua mipangilio'], '结果会显示在这里':['Results appear here','Matokeo yataonekana hapa'],
    '选好人物和服装后点「生成」':['Choose a person and outfit, then select Generate.','Chagua mtu na vazi, kisha bonyeza Tengeneza.'],
    '原图':['Before','Kabla'], '结果':['Result','Matokeo'], '取消':['Cancel','Ghairi'], '下载':['Download','Pakua'], '全部打包':['Download all','Pakua zote'],
    '重来':['Start over','Anza upya'], '当原图':['Use as source','Tumia kama chanzo'], '对比':['Compare','Linganisha'], '设置':['Settings','Mipangilio'],
    '人物':['Person','Mtu'], '生成':['Generate','Tengeneza'], '风格':['Style','Mtindo'], '画幅':['Aspect','Uwiano'], '数量':['Count','Idadi'], '自动':['Auto','Otomatiki'],
    '高级设置':['Advanced settings','Mipangilio ya kina'], '保留原照片背景与光线':['Keep the original background and lighting','Hifadhi mandhari na mwangaza wa picha asili'],
    '工作模式':['Studio mode','Hali ya studio'], '补充要求（可选），例如：海边日落、半身构图、手拿咖啡…':['Additional request (optional), for example: beach sunset, waist-up framing, holding coffee…','Ombi la ziada (si lazima), kwa mfano: machweo ufukweni, fremu ya nusu mwili, kushika kahawa…'],
    '请先上传人物照片、选择服装':['First upload a person photo and choose an outfit','Kwanza pakia picha ya mtu na uchague vazi'], '请先上传人物照片':['Upload a person photo first','Kwanza pakia picha ya mtu'], '请先选择服装':['Choose an outfit first','Kwanza chagua vazi'],
    '减少误拦截':['Reduce false safety blocks','Punguza vizuizi vya kimakosa'], '用更中性的描述发送，减少正常穿搭被误判，不改变服装和姿势':['Send a neutral e-commerce description without changing the outfit or pose.','Tuma maelezo yasiyoegemea upande bila kubadili vazi au mkao.'],
    '英文':['English','Kiingereza'], '中文':['Chinese','Kichina'], '复制':['Copy','Nakili'], '重置':['Reset','Weka upya'], '提示词语言':['Model prompt language','Lugha ya prompt ya modeli'],
    '最终提示词':['Final prompt','Prompt ya mwisho'], '生成记录':['Generation history','Historia ya utengenezaji'], '将生成 1 张':['1 image will be generated','Picha 1 itatengenezwa'],
    '未配置':['Not configured','Haijasanidiwa'], '未配置 API':['API not configured','API haijasanidiwa'], '选择素材':['Choose reference','Chagua rejeleo'], '选择服装':['Choose an outfit','Chagua vazi'],
    '关闭':['Close','Funga'], 'API 设置':['API settings','Mipangilio ya API'], '服务商':['Provider','Mtoa huduma'], '连接':['Connection','Muunganisho'],
    '模型':['Model','Modeli'], '高级':['Advanced','Kina'], '接口协议':['API protocol','Itifaki ya API'], '图片字段名':['Image field name','Jina la uga wa picha'],
    '通过本站代理转发':['Route through this site proxy','Pitisha kupitia proksi ya tovuti'], '显示':['Show','Onyesha'], '清除密钥':['Clear key','Futa ufunguo'],
    '导出':['Export','Hamisha'], '测试连接':['Test connection','Jaribu muunganisho'], '保存':['Save','Hifadhi'],
    '组合提示词':['Prompt combination','Mchanganyiko wa prompt'], '收起':['Collapse','Kunja'], '复制中文描述':['Copy Chinese description','Nakili maelezo ya Kichina'],
    '复制英文提示词':['Copy English prompt','Nakili prompt ya Kiingereza'], '大图预览':['Image preview','Hakiki ya picha'], '上一张':['Previous','Iliyotangulia'], '下一张':['Next','Inayofuata'],
    '快捷键':['Keyboard shortcuts','Njia za mkato'], '聚焦搜索':['Focus search','Lenga utafutaji'], '切换深浅色':['Toggle theme','Badili mandhari'],
    '切换栏目':['Switch sections','Badili sehemu'], '大图：上一张 / 下一张':['Preview: previous / next','Hakiki: iliyotangulia / inayofuata'],
    '大图：切换拍摄角度':['Preview: change angle','Hakiki: badili pembe'], '大图：收藏':['Preview: favourite','Hakiki: kipendwa'], '大图：加入 / 移出组合':['Preview: add / remove from combination','Hakiki: ongeza / ondoa'],
    '大图：复制中文描述':['Preview: copy Chinese description','Hakiki: nakili Kichina'], '大图：复制分享链接':['Preview: copy share link','Hakiki: nakili kiungo'],
    '知道了':['Got it','Nimeelewa'], '回到顶部':['Back to top','Rudi juu'], '使用提示':['Tips','Vidokezo'], '来源与致谢':['Sources and acknowledgements','Vyanzo na shukrani'],
    '隐私说明':['Privacy','Faragha'], '开源地址':['Source code','Msimbo chanzo'], '本机存储':['Local storage','Hifadhi ya kifaa'], 'API 密钥':['API keys','Funguo za API'],
    '代理限制':['Proxy restrictions','Vizuizi vya proksi'], '统计':['Analytics','Takwimu'], '图片':['Images','Picha'],
    '显示成人向内容？':['Show adult references?','Onyesha marejeleo ya watu wazima?'], '暂不':['Not now','Si sasa'], '我已满 18 岁，打开':['I am 18 or older — show them','Nina miaka 18 au zaidi — onyesha'],
    '当前没有可选的内容':['Nothing is available with these filters','Hakuna kinachopatikana kwa vichujio hivi'], '收藏':['Favourite','Kipendwa'], '加入组合':['Add to combination','Ongeza kwenye mchanganyiko'],
    '取消收藏':['Remove favourite','Ondoa kipendwa'], '移出组合':['Remove from combination','Ondoa kwenye mchanganyiko'], '用作姿势参考':['Use as pose reference','Tumia kama rejeleo la mkao'],
    '用作人物参考':['Use as person reference','Tumia kama rejeleo la mtu'], '用作表情参考':['Use as expression reference','Tumia kama rejeleo la mwonekano'], '试穿这套':['Try on this outfit','Jaribu vazi hili'],
    '分享':['Share','Shiriki'], '分享链接':['Share link','Kiungo cha kushiriki'], '下载图片':['Download image','Pakua picha'], '复制图片':['Copy image','Nakili picha'],
    '相似推荐':['Similar references','Marejeleo yanayofanana'], '拍摄角度':['Camera angle','Pembe ya kamera'], '英文提示词 · PROMPT':['English model prompt','Prompt ya modeli kwa Kiingereza'],
    '英文提示词':['English prompt','Prompt ya Kiingereza'], '中文描述':['Chinese description','Maelezo ya Kichina'], '编号':['ID','Kitambulisho'],
    '今天':['Today','Leo'], '昨天':['Yesterday','Jana'], '近 7 天':['Last 7 days','Siku 7 zilizopita'], '更早':['Earlier','Awali'],
    '网络已断开，看过的图片还能继续浏览':['You are offline. Previously viewed images remain available.','Huna mtandao. Picha zilizotazamwa bado zinapatikana.'],
    '网络已恢复':['You are back online.','Mtandao umerudi.'], '密钥无效或已过期，请检查 API Key':['The API key is invalid or expired.','Ufunguo wa API si sahihi au umeisha.'],
    '请求过于频繁，请稍后再试':['Rate limit reached. Try again shortly.','Kikomo cha maombi kimefikiwa. Jaribu tena baadaye.'],
    '图片太大，请换一张更小的照片':['The image is too large. Choose a smaller file.','Picha ni kubwa sana. Chagua faili ndogo.'],
    '图片读取失败':['The image could not be read.','Picha haikuweza kusomwa.'], '下载失败':['Download failed.','Upakuaji umeshindikana.'],
    '衣姿':['PoseWear','PoseWear'], '衣姿 PoseWear':['PoseWear','PoseWear'], '衣姿 PoseWear 首页':['PoseWear home','Mwanzo wa PoseWear'],
    '姿势、服装、动画服装、人像参考图':['Pose, outfit, anime outfit and portrait references','Marejeleo ya mikao, mavazi, mavazi ya anime na picha za uso'],
    '画画、拍照、AI 出图时用。点开看大图和中英文描述，喜欢就收藏；也可以上传自己的照片试穿。':['For drawing, photography and AI image creation. Open a reference, save favourites, or upload your own photo in the studio.','Kwa kuchora, kupiga picha na kutengeneza picha za AI. Fungua rejeleo, hifadhi vipendwa, au pakia picha yako katika studio.'],
    '去试穿':['Open studio','Fungua studio'], '授权素材版本':['Authorized catalog edition','Toleo la katalogi iliyoidhinishwa'],
    '本版本只托管可再分发的素材；CharaDB 动画服装和发型使用其 CC0 元数据，并从原站加载图片。':['This edition hosts only redistributable assets. CharaDB anime outfits and hair use CC0 metadata with source-hosted images.','Toleo hili linahifadhi tu mali zinazoweza kusambazwa tena. Mavazi ya anime na nywele za CharaDB hutumia metadata ya CC0 na picha kutoka tovuti chanzo.'],
    '去看看':['Browse','Vinjari'], '批量':['Bulk select','Chagua nyingi'], '共':['Total','Jumla'], '项':['items','vitu'], '组':['sets','seti'], '张':['images','picha'],
    '姿势和服装参考图。图片来自下方原图库，均为生成图。':['Pose and outfit references from the credited sources below.','Marejeleo ya mikao na mavazi kutoka vyanzo vilivyotajwa hapa chini.'],
    '点 ＋ 把姿势和服装放进组合':['Select + to combine references','Bonyeza + kuunganisha marejeleo'], 'SD 类模型用英文提示词更准':['English prompts usually work best with diffusion models','Prompt za Kiingereza kwa kawaida hufanya kazi vizuri kwa modeli za diffusion'],
    '点':['Select','Bonyeza'], '把姿势和服装放进组合':['to combine pose and outfit references','kuunganisha marejeleo ya mkao na mavazi'],
    '收藏和密钥只存在本机':['Favourites and keys stay on this device','Vipendwa na funguo hubaki kwenye kifaa hiki'],
    '姿势、深度图、服装、场景、灯光、道具和家具来自 Shisei（图片和数据 CC0 1.0）':['Poses, depth maps, outfits, scenes, lighting, props and furniture are from Shisei (images and data: CC0 1.0).','Mikao, ramani za kina, mavazi, mandhari, mwangaza, vifaa na samani vinatoka Shisei (picha na data: CC0 1.0).'],
    '姿势、深度图、服装、场景、灯光、道具和家具来自':['Poses, depth maps, outfits, scenes, lighting, props and furniture are from','Mikao, ramani za kina, mavazi, mandhari, mwangaza, vifaa na samani vinatoka'], '（图片和数据 CC0 1.0）':['(images and data: CC0 1.0)','(picha na data: CC0 1.0)'],
    '人像来自 AI Portrait Gallery（@agi_aibusi，CC0 1.0）':['Portraits are from AI Portrait Gallery (@agi_aibusi, CC0 1.0).','Picha za uso zinatoka AI Portrait Gallery (@agi_aibusi, CC0 1.0).'],
    '人像来自':['Portraits are from','Picha za uso zinatoka'], '（@agi_aibusi，CC0 1.0）':['(@agi_aibusi, CC0 1.0)','(@agi_aibusi, CC0 1.0)'], '（':['(','('], '，CC0 1.0）':[', CC0 1.0)',', CC0 1.0)'],
    '动画服装和发型使用 CharaDB 的 CC0 元数据；图片由原站托管':['Anime outfits and hair use CharaDB CC0 metadata; images are hosted by the source site.','Mavazi ya anime na nywele hutumia metadata ya CharaDB CC0; picha huhifadhiwa na tovuti chanzo.'],
    '动画服装和发型使用':['Anime outfits and hair use CC0 metadata from','Mavazi ya anime na nywele hutumia metadata ya CC0 kutoka'], '的 CC0 元数据；图片由原站托管':['; images are hosted by the source site','; picha huhifadhiwa na tovuti chanzo'],
    '表情图为 PoseWear 基于 MIT 许可 ICT-FaceKit 制作的渲染':['Expression images are PoseWear renders based on MIT-licensed ICT-FaceKit.','Picha za mionekano ni render za PoseWear zinazotumia ICT-FaceKit yenye leseni ya MIT.'],
    '表情图来自 WaveSpeed AI Emotion Gallery，底层头模为 ICT Face Model Light（ICT-FaceKit，© USC Institute for Creative Technologies，MIT）。无身份灰模头，只传神态、不传长相。':['Expression references are PoseWear renders based on the MIT-licensed ICT Face Model Light. The identity-neutral heads transfer expression, not appearance.','Marejeleo ya mionekano ni render za PoseWear zinazotumia ICT Face Model Light yenye leseni ya MIT. Vichwa visivyo na utambulisho huhamisha mwonekano, si sura.'],
    '数据来自 CharaDB（作者 たき AI），标签数据 CC0；图片由原站托管、本站不保存，版权归原作者。':['Metadata is from CharaDB (Taki AI), licensed CC0. Images remain source-hosted and are not stored here.','Metadata inatoka CharaDB (Taki AI), yenye leseni ya CC0. Picha huhifadhiwa na chanzo na hazihifadhiwi hapa.'],
    '中国历代服饰来自 Shisei（作者 wquguru），图片与数据 CC0 1.0，可自由使用。':['Historical outfits are from Shisei (wquguru); images and data are CC0 1.0.','Mavazi ya kihistoria yanatoka Shisei (wquguru); picha na data ni CC0 1.0.'],
    '场景来自 Shisei（作者 wquguru），图片与数据 CC0 1.0，可自由使用。空景中央留空，方便把人物放进去。':['Scenes are from Shisei (wquguru); images and data are CC0 1.0. Open centres make subject placement easier.','Mandhari yanatoka Shisei (wquguru); picha na data ni CC0 1.0. Nafasi wazi katikati hurahisisha kuweka mhusika.'],
    '光影来自 Shisei（作者 wquguru），图片与数据 CC0 1.0。同一个人台、同样的灰球，只有光在变——照着挑光型、抄英文描述即可。':['Lighting references are from Shisei (wquguru); images and data are CC0 1.0. The subject stays fixed while lighting changes.','Marejeleo ya mwangaza yanatoka Shisei (wquguru); picha na data ni CC0 1.0. Mhusika hubaki palepale huku mwangaza ukibadilika.'],
    '道具来自 Shisei（作者 wquguru），图片与数据 CC0 1.0，可自由使用。':['Props are from Shisei (wquguru); images and data are CC0 1.0.','Vifaa vinatoka Shisei (wquguru); picha na data ni CC0 1.0.'],
    '家具来自 Shisei（作者 wquguru），图片与数据 CC0 1.0；尺寸为真实厘米数，与人台同比例。':['Furniture is from Shisei (wquguru); images and data are CC0 1.0, with real centimetre dimensions.','Samani zinatoka Shisei (wquguru); picha na data ni CC0 1.0, zikiwa na vipimo halisi vya sentimita.'],
    'PoseWear 代码采用 MIT 许可证；完整第三方说明随源码提供':['PoseWear code is MIT licensed; complete third-party notices are included with the source.','Msimbo wa PoseWear una leseni ya MIT; taarifa kamili za wahusika wengine zimo kwenye chanzo.'],
    '部分参考属于成人向内容，默认不显示，可以用顶部的「18+」开关打开或关闭。':['Some adult references are hidden by default and can be controlled with the 18+ switch.','Baadhi ya marejeleo ya watu wazima yamefichwa kwa kawaida na yanaweza kudhibitiwa kwa swichi ya 18+.'],
    '上传照片，选一套衣服，换上看看。':['Upload a photo, choose an outfit and try it on.','Pakia picha, chagua vazi na ulijaribu.'],
    '从库里选，或上传图片':['Choose from the library or upload an image','Chagua maktabani au pakia picha'], '选择姿势（可选）':['Choose a pose (optional)','Chagua mkao (si lazima)'],
    '不选就保持原姿势':['Leave empty to keep the original pose','Acha wazi kuhifadhi mkao wa awali'], '选择表情（可选）':['Choose an expression (optional)','Chagua mwonekano (si lazima)'],
    '只取神态，不换脸':['Transfer expression only; keep identity','Hamisha mwonekano tu; hifadhi utambulisho'], '照片质感':['Photo realistic','Uhalisia wa picha'],
    '影棚大片':['Studio editorial','Picha ya studio'], '城市街拍':['City street style','Mtindo wa mtaani'], '电商白底':['E-commerce white background','Mandhari nyeupe ya biashara'],
    '胶片氛围':['Film look','Mwonekano wa filamu'], '动漫插画':['Anime illustration','Mchoro wa anime'], '竖 2:3':['Portrait 2:3','Wima 2:3'], '竖 3:4':['Portrait 3:4','Wima 3:4'],
    '竖 9:16':['Portrait 9:16','Wima 9:16'], '方 1:1':['Square 1:1','Mraba 1:1'], '横 4:3':['Landscape 4:3','Mlalo 4:3'], '横 16:9':['Landscape 16:9','Mlalo 16:9'],
    '还没有生成记录':['No generation history yet','Bado hakuna historia ya utengenezaji'], '还缺：人物照片、服装、API 密钥':['Still needed: person photo, outfit and API key','Bado vinahitajika: picha ya mtu, vazi na ufunguo wa API'],
    '请先上传人物照片':['Upload a person photo first','Pakia picha ya mtu kwanza'], '豆包 Seedream':['Seedream','Seedream'], '火山方舟 · 国内直连':['Volcengine Ark','Volcengine Ark'],
    '自定义中转':['Custom relay','Relay maalum'], 'OpenAI 兼容':['OpenAI compatible','Inayooana na OpenAI'],
    'images/edits · multipart（OpenAI 官方格式）':['images/edits · multipart (official OpenAI format)','images/edits · multipart (muundo rasmi wa OpenAI)'],
    'images/generations · JSON 多图（多数中转 / gpt-image-2）':['images/generations · multi-image JSON (most relays / gpt-image-2)','images/generations · JSON ya picha nyingi (relay nyingi / gpt-image-2)'],
    'Gemini · models/:generateContent（Nano Banana 等）':['Gemini · models/:generateContent','Gemini · models/:generateContent'], 'image[]（官方，多图）':['image[] (official, multiple images)','image[] (rasmi, picha nyingi)'],
    'image（部分中转）':['image (some relays)','image (baadhi ya relay)'],
    '中转不支持跨域（CORS）时再打开。只转发，不保存。不勾选时由浏览器直连中转地址（含非 443 端口）。':['Enable only when a relay does not support CORS. The proxy forwards without application logging or storage; direct mode connects from your browser.','Washa tu wakati relay haitumii CORS. Proksi hupitisha bila programu kurekodi au kuhifadhi; hali ya moja kwa moja huunganisha kutoka kivinjari chako.'],
    '密钥':['Key','Ufunguo'], '只存在这个浏览器里，请求直接发给你填的地址。用公共电脑记得清除。':['Stored only in this browser and sent to the endpoint you configure. Clear it on shared devices.','Huhifadhiwa katika kivinjari hiki tu na kutumwa kwa endpoint unayosanidi. Ifute kwenye vifaa vya pamoja.'],
    '切换界面语言（英 / 斯）':['Switch interface language (English / Kiswahili)','Badili lugha ya kiolesura (Kiingereza / Kiswahili)'], '大图：复制英文描述':['Preview: copy English description','Hakiki: nakili maelezo ya Kiingereza'],
    '还没有收藏可导出':['There are no favourites to export','Hakuna vipendwa vya kuhamisha'], '导入失败：文件格式不正确':['Import failed: invalid file format','Uingizaji umeshindikana: muundo wa faili si sahihi'],
    '服务商返回：':['Provider response:','Jibu la mtoa huduma:'], '请求过于频繁或额度已用完，请稍后再试或检查账户余额':['Rate limit or quota reached. Try again shortly or check your provider account.','Kikomo au salio limefikiwa. Jaribu tena baadaye au kagua akaunti ya mtoa huduma.'],
    '服务商内部错误，请稍后重试':['Provider error. Try again shortly.','Hitilafu ya mtoa huduma. Jaribu tena baadaye.'], '等了 3 分钟还没有返回。服务商可能正忙，稍后点「重试」。':['No response after three minutes. The provider may be busy; try again later.','Hakuna jibu baada ya dakika tatu. Mtoa huduma anaweza kuwa na shughuli; jaribu tena baadaye.'],
    '重试':['Retry','Jaribu tena'], '检查 API 设置':['Check API settings','Kagua mipangilio ya API'], '已取消生成':['Generation cancelled','Utengenezaji umeghairiwa'], '生成完成':['Generation complete','Utengenezaji umekamilika'],
    '被服务商的安全审核拦下了':['Blocked by the provider safety review','Imezuiwa na ukaguzi wa usalama wa mtoa huduma'], '换服务商重试':['Try another provider','Jaribu mtoa huduma mwingine'], '换一套服装':['Choose another outfit','Chagua vazi jingine'],
    '判断这次请求不合规':['determined that this request does not meet its policy','imeamua kuwa ombi hili halikidhi sera yake'], '判断上传的照片或服装图不合规':['determined that an uploaded person or outfit image does not meet its policy','imeamua kuwa picha ya mtu au vazi iliyopakiwa haikidhi sera yake'],
    '判断生成出来的图片不合规':['determined that the generated image does not meet its policy','imeamua kuwa picha iliyotengenezwa haikidhi sera yake'], '真人照片配上比较暴露的服装（泳装、内衣、露背等）很容易被拦，OpenAI 审核最严，Gemini 和豆包 Seedream 相对宽松一些。':['Real-person photos with revealing outfits are often blocked. Provider policies differ.','Picha za watu halisi zenye mavazi yanayoonyesha mwili mara nyingi huzuiwa. Sera za watoa huduma hutofautiana.'],
    '可以换一家服务商，或换一套遮挡多一点的服装。原样重试大多还会被拦。':['Try another provider or choose a more covering outfit. Retrying unchanged will usually be blocked again.','Jaribu mtoa huduma mwingine au chagua vazi linalofunika zaidi. Kujaribu tena bila kubadili kwa kawaida kutazuiwa tena.'],
    '查看原始信息':['View technical details','Tazama maelezo ya kiufundi'], '实际发送的提示词':['Prompt sent to the provider','Prompt iliyotumwa kwa mtoa huduma'], '已开启减少误拦截':['neutral rewrite enabled','uandishi upya usioegemea umewashwa'],
    '无法连接到服务商：网络不通，或该地址不允许浏览器跨域访问（CORS）。':['Could not reach the provider. The network may be unavailable or the endpoint may block browser CORS requests.','Imeshindikana kufikia mtoa huduma. Mtandao unaweza kutopatikana au endpoint inaweza kuzuia maombi ya CORS ya kivinjari.'],
    '可在 API 设置中开启「通过本站代理转发」。':['You can enable this site proxy in API settings.','Unaweza kuwasha proksi ya tovuti hii katika mipangilio ya API.'],
    '密钥无效或已过期，请检查 API Key':['The API key is invalid or expired.','Ufunguo wa API si sahihi au umeisha.'], '已取消':['Cancelled','Imeghairiwa'],
    '加载中…':['Loading…','Inapakia…'], '移除':['Remove','Ondoa'], '最多 3 张人物照片':['Up to three person photos are supported','Picha hadi tatu za mtu zinatumika'], '请选择图片文件':['Choose an image file','Chagua faili ya picha'],
    '无法读取这张图片':['This image could not be read','Picha hii haikuweza kusomwa'], '无法读取服装图':['The outfit image could not be read','Picha ya vazi haikuweza kusomwa'],
    '没有匹配的结果':['No matching results','Hakuna matokeo yanayolingana'], '最多选择 6 个姿势':['Choose up to six poses','Chagua hadi mikao sita'],
    '正在连接…':['Connecting…','Inaunganisha…'], '请先填写 API Key':['Enter an API key first','Weka ufunguo wa API kwanza'], '请填写 Base URL':['Enter a Base URL','Weka Base URL'],
    '连接成功：':['Connection successful:','Muunganisho umefaulu:'], 'API 设置已保存在本机':['API settings saved on this device','Mipangilio ya API imehifadhiwa kwenye kifaa hiki'], '已从本机清除密钥':['Key removed from this device','Ufunguo umeondolewa kwenye kifaa hiki'],
    '东亚女性':['East Asian woman','Mwanamke wa Asia Mashariki'], '欧美女性':['White woman','Mwanamke mzungu'], '男性模特':['Male model','Modeli wa kiume'], '动漫角色':['Anime character','Mhusika wa anime'], '自定义':['Custom','Maalum'],
  };

  const originals = new WeakMap();
  const attrOriginals = new WeakMap();
  const attrs = ['placeholder', 'aria-label', 'title'];
  const current = () => {
    try { return JSON.parse(localStorage.lang || '"en"') === 'sw' ? 'sw' : 'en'; } catch (_) { return 'en'; }
  };
  const translate = (value, lang) => {
    const clean = value.trim();
    const direct = TEXT[clean];
    if (direct) return value.replace(clean, direct[lang === 'sw' ? 1 : 0]);
    let match = clean.match(/^共\s*(\d[\d,]*)\s*项$/);
    if (match) return lang === 'sw' ? `Jumla ${match[1]}` : `${match[1]} items`;
    match = clean.match(/^(\d[\d,]*)\s*\/\s*(\d[\d,]*)\s*项$/);
    if (match) return lang === 'sw' ? `${match[1]} kati ya ${match[2]}` : `${match[1]} of ${match[2]} items`;
    match = clean.match(/^共\s*(\d[\d,]*)\s*组\s*·\s*(\d[\d,]*)\s*张$/);
    if (match) return lang === 'sw' ? `Seti ${match[1]} · picha ${match[2]}` : `${match[1]} sets · ${match[2]} images`;
    match = clean.match(/^(\d[\d,]*)\s*\/\s*(\d[\d,]*)\s*组\s*·\s*(\d[\d,]*)\s*张$/);
    if (match) return lang === 'sw' ? `${match[1]} kati ya ${match[2]} seti · picha ${match[3]}` : `${match[1]} of ${match[2]} sets · ${match[3]} images`;
    match = clean.match(/^组\s*·\s*(\d[\d,]*)\s*张$/);
    if (match) return lang === 'sw' ? `seti · picha ${match[1]}` : `sets · ${match[1]} images`;
    match = clean.match(/^第\s*(\d+)\s*\/\s*(\d+)\s*项$/);
    if (match) return lang === 'sw' ? `${match[1]} kati ya ${match[2]}` : `${match[1]} of ${match[2]}`;
    match = clean.match(/^已导出\s+(\d+)\s+条收藏$/);
    if (match) return lang === 'sw' ? `Vipendwa ${match[1]} vimehamishwa` : `Exported ${match[1]} favourites`;
    match = clean.match(/^已导入\s+(\d+)\s+条收藏$/);
    if (match) return lang === 'sw' ? `Vipendwa ${match[1]} vimeingizwa` : `Imported ${match[1]} favourites`;
    if (clean.startsWith('生成失败')) return lang === 'sw' ? clean.replace('生成失败', 'Utengenezaji umeshindikana') : clean.replace('生成失败', 'Generation failed');
    let expanded = value;
    for (const [source, options] of Object.entries(TEXT)) {
      if (source.length >= 4 && expanded.includes(source)) expanded = expanded.split(source).join(options[lang === 'sw' ? 1 : 0]);
    }
    if (expanded !== value) return expanded;
    return value;
  };
  function apply(root = document) {
    const lang = current();
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || /^(SCRIPT|STYLE|TEXTAREA)$/.test(node.parentElement.tagName)) continue;
      if (!originals.has(node)) originals.set(node, node.nodeValue);
      const original = originals.get(node);
      const next = translate(original, lang);
      if (node.nodeValue !== next) node.nodeValue = next;
    }
    const elements = root.nodeType === 1 ? [root, ...root.querySelectorAll('*')] : [...root.querySelectorAll('*')];
    for (const element of elements) {
      let saved = attrOriginals.get(element);
      if (!saved) { saved = {}; attrOriginals.set(element, saved); }
      for (const attr of attrs) {
        if (!element.hasAttribute(attr)) continue;
        if (!(attr in saved)) saved[attr] = element.getAttribute(attr);
        const next = translate(saved[attr], lang);
        if (element.getAttribute(attr) !== next) element.setAttribute(attr, next);
      }
    }
    document.title = lang === 'sw' ? 'PoseWear · Studio ya marejeleo' : 'PoseWear · Reference Studio';
  }
  function set(lang) {
    lang = lang === 'sw' ? 'sw' : 'en';
    localStorage.lang = JSON.stringify(lang);
    document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('on', button.dataset.lang === lang));
    apply(document);
    window.dispatchEvent(new CustomEvent('posewear-language', { detail: lang }));
  }
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') apply(record.target.parentElement || document);
      for (const node of record.addedNodes) if (node.nodeType === 1) apply(node); else if (node.parentElement) apply(node.parentElement);
    }
  });
  window.PWI18N = { apply, set, current, text: (value) => translate(value, current()) };
  addEventListener('DOMContentLoaded', () => {
    apply(document);
    document.documentElement.classList.add('i18n-ready');
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
  });
})();
