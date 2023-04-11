import { authSession } from '@/service/backend/auth';
import { CRDMeta, GetCRD } from '@/service/backend/kubernetes';
import { jsonRes } from '@/service/backend/response';
import type { NextApiRequest, NextApiResponse } from 'next';

type AccountStatus = {
  balance: number;
  deductionBalance: number;
  chargeList: any[];
};

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const kc = await authSession(req.headers);

    // get user account payment amount
    const user = kc.getCurrentUser();
    if (user === null) {
      return jsonRes(resp, { code: 401, message: 'user null' });
    }

    const account_meta: CRDMeta = {
      group: 'account.sealos.io',
      version: 'v1',
      namespace: 'sealos-system',
      plural: 'accounts'
    };

    const accountDesc = await GetCRD(kc, account_meta, user.name);
    if (accountDesc?.body?.status) {
      const data = accountDesc?.body?.status as AccountStatus;
      return jsonRes(resp, { data: data });
    }
  } catch (error) {
    jsonRes(resp, { code: 500, data: error });
  }
}
