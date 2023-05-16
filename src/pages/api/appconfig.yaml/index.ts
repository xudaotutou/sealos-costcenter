import yaml from 'js-yaml';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    apiVersion: 'app.sealos.io/v1',
    kind: 'App',
    metadata: {
      name: 'cost-center'
    },
    spec: {
      name: 'cost-center',
      type: 'iframe',
      data: {
        url: 'https://'+ req.headers.host,
      },
      icon: 'https://' + req.headers.host + '/favicon.ico',
      menuData: {
        nameColor: 'text-black',
      }
    }

  };
  const yamlData = yaml.dump(data);
  res.setHeader('Content-Type', 'application/x-yaml');
  res.status(200).send(yamlData);
}
