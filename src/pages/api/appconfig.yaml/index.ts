import yaml from 'js-yaml';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    apiVersion: 'app.sealos.io/v1',
    kind: 'App',
    metadata: {
      name: 'cost center'
    },
    spec: {
      name: 'cost center',
      icon: req.headers.host + '/favicon.ico',
      type: 'iframe'
    },
    data: {
      url: req.headers.host,
    },
    icon: req.headers.host + '/favicon.ico',
    menuData: {
      nameColor: 'text-black',
    }
  };
  const yamlData = yaml.dump(data);
  res.setHeader('Content-Type', 'application/x-yaml');
  res.status(200).send(yamlData);
}
