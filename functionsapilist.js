export async function onRequest(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const db = context.env.DB;

    const { results } = await db.prepare(`
      SELECT 
        name, gender, age, date,
        resp_rate, resp_score, depth_score,
        sbp, sbp_score, capillary_score,
        gcs_mapped, ts_total,
        gcs_eye, gcs_verbal, gcs_motor, gcs_total,
        severity, prognosis,
        created_at
      FROM trauma_records
      ORDER BY created_at DESC
    `).all();

    return new Response(JSON.stringify(results), { headers });
  } catch (err) {
    console.error('List error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers
    });
  }
}