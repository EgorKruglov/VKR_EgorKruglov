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
    @Size(max = 255, message = "Address must be less than 255 characters")
    private String deliveryAddress;

    @NotNull(message = "Delivery date is required")
    @Future(message = "Delivery date must be in the future")
    private LocalDateTime deliveryDate;

    @NotBlank(message = "Coal type is required")
    private String coalType;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1 ton")
    @Max(value = 10000, message = "Quantity must be less than 10000 tons")
    private Integer quantity;

    private OrderStatus status;

    @Size(max = 500)
    private String comments;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
