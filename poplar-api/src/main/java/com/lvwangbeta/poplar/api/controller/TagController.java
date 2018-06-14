package com.lvwangbeta.poplar.api.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.lvwangbeta.poplar.common.intr.*;
import com.lvwangbeta.poplar.common.model.Message;
import com.lvwangbeta.poplar.common.util.Property;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/api/v1/tag")
public class TagController {
	
	@Reference
	private TagService tagService;

	@ResponseBody
	@RequestMapping("/recommend")
	public Message recommendTags() {
		Message message = new Message();
		message.add("tags", tagService.getRecommendTags(10));
		message.setErrno(Property.SUCCESS);
		return message;
	}

}
