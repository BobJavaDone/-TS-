导出 异步 函数 onRequest(上下文) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const db = context.env.DB;

    const { results } = await db.prepare(`
      SELECT 
        姓名、性别、年龄、日期、
        呼吸频率、呼吸评分、深度评分、
        血压、血压评分、毛细血管评分，
        GCS评分、总时间，
        gcs_eye, gcs_verbal, gcs_motor, gcs_total,
        严重程度、预后，
        创建时间
      来自 trauma_records
      按 created_at 降序排列
    `).all();

    返回 新的 响应(JSON.字符串化(结果), { 头 });
  } catch (err) {
    控制台.错误('列表错误：', 错误对象);
    返回 新的 响应(JSON.字符串化({ 错误: 错误.消息 }), {
      状态: 500,
      标题
    });
  }
}
