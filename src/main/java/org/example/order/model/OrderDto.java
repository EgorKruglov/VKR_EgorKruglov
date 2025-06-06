package org.example.order.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Long id;

    private Long userId;

    @NotBlank(message = "Delivery address is required")
    @Size(max = 255)
    private String deliveryAddress;

    @NotNull(message = "Delivery date is required")
    @Future
    private LocalDateTime deliveryDate;

    @NotNull(message = "Coal type is required")
    private CoalType coalType;

    @NotNull(message = "Quantity is required")
    @Min(1)
    @Max(10000)
    private Integer quantity;

    private OrderStatus status;

    @Size(max = 500)
    private String comments;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
