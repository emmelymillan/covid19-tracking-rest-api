import DB from "../models/index.js";
import sequelize from "sequelize";

const Balance = DB.balance;
const { QueryTypes } = sequelize;

export async function getCasesBalance(req, res) {
  const balance = await Balance.findOne({ where: { id: 1 } });

  const chartCasosTotales = await DB.sequelize.query(
    `
      select to_char(fecha_ingreso, 'month') as "month", count(*)
      from caso
      where date_part('year', fecha_ingreso) = '2022'
      group by date_part('month', fecha_ingreso), to_char(fecha_ingreso, 'month');
    `,
    { type: QueryTypes.SELECT }
  );

  const chartCasosTotalesActivos = await DB.sequelize.query(
    `
      select fecha_ingreso ::date as "date", count(*)
      from caso
      where date_part('year', fecha_ingreso) = '2022' and fecha_recuperacion is null and fecha_fallecimiento is null
      group by fecha_ingreso::date, date_part('day', fecha_ingreso);
    `,
    { type: QueryTypes.SELECT }
  );

  const chartCasosRecuperadosAcumulado = await DB.sequelize.query(
    `
      select to_char(fecha_recuperacion, 'month') as "Months", count(*)
      from caso
      where date_part('year', fecha_recuperacion) = '2022'
      group by date_part('month', fecha_recuperacion), to_char(fecha_recuperacion, 'month');
    `,
    { type: QueryTypes.SELECT }
  );

  const chartCasosRecuperadosPorDia = await DB.sequelize.query(
    `
      select fecha_recuperacion::date as "date", count(*)
      from caso
      where date_part('year', fecha_recuperacion) = '2022'
      group by fecha_recuperacion::date, date_part('day', fecha_recuperacion);
    `,
    { type: QueryTypes.SELECT }
  );

  const chartCasosFallecidosAcumulado = await DB.sequelize.query(
    `
      select to_char(fecha_fallecimiento , 'month') as "Months", count(*)
      from caso
      where date_part('year', fecha_fallecimiento) = '2022'
      group by date_part('month', fecha_fallecimiento), to_char(fecha_fallecimiento, 'month');
    `,
    { type: QueryTypes.SELECT }
  );

  const chartCasosFallecidosPorDia = await DB.sequelize.query(
    `
      select fecha_fallecimiento::date as "date", count(*)
      from caso
      where date_part('year', fecha_fallecimiento) = '2022'
      group by fecha_fallecimiento::date, date_part('day', fecha_fallecimiento);
    `,
    { type: QueryTypes.SELECT }
  );

  const chartGenerosTotales = await DB.sequelize.query(
    `
      select p.genero, count(*) 
      from paciente p
      group by genero;
    `,
    { type: QueryTypes.SELECT }
  );

  const chartGenerosRecuperados = await DB.sequelize.query(
    `
      select p.genero, count(*) 
      from paciente p, caso c
      where p.id = c.fk_paciente and c.fecha_fallecimiento is null and c.fecha_recuperacion is not null
      group by p.genero;
    `,
    { type: QueryTypes.SELECT }
  );

  const chartGenerosFallecidos = await DB.sequelize.query(
    `
      select p.genero, count(*) 
      from paciente p, caso c
      where p.id = c.fk_paciente and c.fecha_fallecimiento is not null
      group by p.genero;
    `,
    { type: QueryTypes.SELECT }
  );

  res.status(200).json({
    id: balance.id,
    casosTotales: balance.total,
    casosRecuperados: balance.recuperados,
    casosFallecidos: balance.fallecidos,
    casosActivos: balance.total - (balance.recuperados + balance.fallecidos),
    chartCasosTotales: chartCasosTotales,
    chartCasosTotalesActivos: chartCasosTotalesActivos,
    chartCasosRecuperadosAcumulado: chartCasosRecuperadosAcumulado,
    chartCasosRecuperadosPorDia: chartCasosRecuperadosPorDia,
    chartCasosFallecidosAcumulado: chartCasosFallecidosAcumulado,
    chartCasosFallecidosPorDia: chartCasosFallecidosPorDia,
    chartGenerosTotales: chartGenerosTotales,
    chartGenerosRecuperados: chartGenerosRecuperados,
    chartGenerosFallecidos: chartGenerosFallecidos,
  });

  // then((casos) => {
  //   res.status(200).json({casosTotales: casos});
  // })
  // .catch((err) => {
  //   res.status(500).send({ message: err.message });
  // });;
}
