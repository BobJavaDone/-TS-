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
        severity, prognosis,
        created_at
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
      data.sbp_score,
      data.capillary_score,
      data.gcs_mapped,
      data.ts_total,
      data.gcs_eye,
      data.gcs_verbal,
      data.gcs_motor,
      data.gcs_total,
      data.severity,
      data.prognosis,
      data.created_at
    ).run();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err) {
    console.error('Save error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers
    });
  }
}