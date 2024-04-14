export enum dataKeyEnum {
  din = "din",
  loyl = "loyl",
  pmnts_nmbr = "pmnts_nmbr",
  pmnts_sum = "pmnts_sum",
}

export const chartsText: Record<string, { title: string; text: string; dataKey: dataKeyEnum }> = {
  dynamic: {
    title: "График прогноза динамики",
    text: "Сводный график отображает изменение динамики по лояльности клиента, кол-ву взносов и сумме взноссов",
    dataKey: dataKeyEnum.din,
  },
  loyality: {
    title: "График прогноза лояльности клиента",
    text: "График отображает вероятность лояльности клиента",
    dataKey: dataKeyEnum.loyl,
  },
  deposit: {
    title: "График прогноза кол-во взносов",
    text: "График отображает общее кол-во взносов действующими клиентами",
    dataKey: dataKeyEnum.pmnts_nmbr,
  },
  sumDeposit: {
    title: "График прогноза общей суммы взоносов",
    text: "График отображает общую сумму прогнозированных взносов сделанных клиентом",
    dataKey: dataKeyEnum.pmnts_sum,
  },
};
