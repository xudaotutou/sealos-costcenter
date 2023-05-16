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
      icon: '',
      type: 'iframe'
    },
    data: {
      url: req.headers.host,
      desc: ''
    },
    icon: req.headers.host + '/favicon.ico',
    menuData: {
      nameColor: 'text-black',
      helpDropDown: '',
      helpDocs: ''
    }
  };
  const yamlData = yaml.dump(data);
  res.setHeader('Content-Type', 'application/x-yaml');
  res.status(200).send(yamlData);
}
