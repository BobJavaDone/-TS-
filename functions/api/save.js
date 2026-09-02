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
    await db.prepare(`
      INSERT INTO trauma_records (
        name, gender, age, date,
        呼吸频率、呼吸评分、深度评分、
        血压、血压评分、毛细血管评分，
        GCS评分、总时间，
        gcs_eye, gcs_verbal, gcs_motor, gcs_total,
        严重程度、预后，
        创建时间
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      数据.姓名,
      数据.性别,
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
    返回 新的 Response(JSON.stringify({ success: 真 }), { headers });
  } catch (err) {
    返回 新的 Response(JSON.stringify({ 错误: err.消息 }), {
      状态: 500,
      标题
    });
  }
}
