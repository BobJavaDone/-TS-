export async function onRequest(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers 
    });
  }

  try {
    const data = await context.request.json();
    const db = context.env.DB;

    const { error } = await db.prepare(`
      INSERT INTO trauma_records (
        name, gender, age, date,
        resp_rate, resp_score, depth_score,
        sbp, sbp_score, capillary_score,
        gcs_mapped, ts_total,
        gcs_eye, gcs_verbal, gcs_motor, gcs_total,
        严重程度、预后，
        创建时间
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.name,
      data.gender,
      data.age,
      data.date,
      data.resp_rate,
      data.resp_score,
      data.depth_score,
      data.sbp,
      数据.sbp_score,
      数据.毛细血管评分,
      数据.GCS映射值,
      数据.ts_total,
      data.gcs_eye,
      data.gcs_verbal,
      data.gcs_motor,
      data.gcs_total,
      数据.严重程度,
      数据.预后,
      数据.创建时间
    ).运行();

    如果 (错误) 抛出 错误;

    返回 新的 Response(JSON.字符串化({ 成功: 真 }), { headers });
  } catch (err) {
    控制台.错误('保存错误：', 错误对象);
    返回 新的 响应(JSON.字符串化({ 错误: 错误.消息 }), {
      状态: 500,
      标题
    });
  }
}
