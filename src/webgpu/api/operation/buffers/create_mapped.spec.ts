export const description = '';

import { params, pbool, poptions } from '../../../../common/framework/params.js';
import { TestGroup } from '../../../../common/framework/test_group.js';

import { MappingTest } from './mapping_test.js';

export const g = new TestGroup(MappingTest);

g.test('createBufferMapped')
  .params(
    params()
      .combine(poptions('size', [12, 512 * 1024]))
      .combine(pbool('mappable'))
  )
  .fn(t => {
    const { size, mappable } = t.params;
    const [buffer, arrayBuffer] = t.device.createBufferMapped({
      size,
      usage: GPUBufferUsage.COPY_SRC | (mappable ? GPUBufferUsage.MAP_WRITE : 0),
    });
    t.checkMapWrite(buffer, arrayBuffer, size);
  });
