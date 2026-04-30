# 海外平台医疗体检需求调研计划

## 目标
调研海外平台中外国人来中国医疗、体检、就医、签证体检、国际医院、医疗旅游相关内容，沉淀原始样本、需求痛点、竞品广告和落地推广建议，输出到 `doc` 目录。

## 阶段
| 阶段 | 状态 | 内容 |
|---|---|---|
| 1 | complete | 初始化计划文件，确认工具与输出目录 |
| 2 | complete | 检索海外平台内容与同行广告样本 |
| 3 | complete | 清洗样本，识别需求、痛点、平台、链接、发帖人 |
| 4 | complete | 生成 XLSX 原始调研表 |
| 5 | complete | 生成 DOCX 可行性报告与推广方案 |
| 6 | complete | 验证文件可打开、内容完整，并总结交付 |

## 输出物
- `doc/foreigners_china_medical_research.xlsx`
- `doc/china_medical_checkup_feasibility_report.docx`
- `doc/research_sources.json`

## 已知限制
- 当前工具发现未暴露名为 xpoz 的 MCP 工具或资源；本次使用可用联网检索完成研究，并在 JSON/进度中记录限制。

## 验证结果
- Excel：5 个工作表，原始样本 54 条。
- Word：45 个段落，5 个表格。
- DOCX 渲染：LibreOffice/soffice 不可用，无法完成页面 PNG 视觉 QA；已完成结构检查。

## 质量要求
- 尽量覆盖 Reddit、Quora、Tripadvisor、Expat/论坛、医院/医疗旅游竞品页面等海外渠道。
- 区分自然需求帖与同行推广广告，记录竞品卖点和未解决问题。
- 报告需给出静态站切入方向、联系方式设计、平台推广方式和英文推广话术。
