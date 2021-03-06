export const description = `
Basic tests.
`;

import { TestGroup } from '../../../../common/framework/test_group.js';
import { GPUTest } from '../../../gpu_test.js';

export const g = new TestGroup(GPUTest);

g.test('empty').fn(async t => {
  const encoder = t.device.createCommandEncoder();
  const cmd = encoder.finish();
  t.device.defaultQueue.submit([cmd]);
});
