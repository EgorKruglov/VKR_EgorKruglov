package org.example.order.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.user.model.UserDto;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FullOrderDto {
    private OrderDto orderDto;
    private UserDto userDto;
}
