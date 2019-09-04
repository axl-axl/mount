'use strict';

module.exports = {
  async addAnimation(fastify, { nameAni, describeAni, power, race, hometown, relation = null}) {
    const db = await fastify.mysql.getConnection();
    const sql = `INSERT INTO animation
    (nameAni, describeAni, power, hometown, race, relation) VALUES
    ( '${nameAni}', '${describeAni}', '${power}', '${hometown}', ${race}, ${relation} )`
    console.log(sql)
    return db.query(sql);
  },
  async delAnimation(fastify, id) {
    const db = await fastify.mysql.getConnection();
    const sql = `DELETE FROM animation WHERE id=${id}`;
    return db.query(sql);
  },
  async updateAnimation(fastify, id, datas) {
    const datasLists = Object.entries(datas);
    let upDatas = '';
    datasLists.forEach((val) => {
      upDatas += val[0] === 'race' ? `${val[0]}=${val[1]},` : `${val[0]}='${val[1]}',`
    })
    const str = upDatas.slice(0, -1);
    const db = await fastify.mysql.getConnection();
    const sql = `UPDATE animation SET ${str} WHERE id=${id}`;
    return db.query(sql);
  },
  async getAnimation(fastify, where, fields=['*']) {
    const db = await fastify.mysql.getConnection();
    let whereDatas = '';
    Object.entries(where).forEach((val) => {
      whereDatas += `${val[0]}='${val[1]}' AND `
    })
    const str = whereDatas.slice(0, -5);
    const sql = `SELECT ${fields.length > 1 ? fields.join(',').slice(0, -1): fields.join(',')} FROM animation${ str ? ` WHERE ${str}` : ''}`;
    return db.query(sql);
  }
}