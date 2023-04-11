using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Land_Vision.Migrations
{
    /// <inheritdoc />
    public partial class add_vip_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "VipId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Vips",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    VipLevel = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "double", nullable: false),
                    PostLimit = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vips", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Users_VipId",
                table: "Users",
                column: "VipId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Vips_VipId",
                table: "Users",
                column: "VipId",
                principalTable: "Vips",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Vips_VipId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Vips");

            migrationBuilder.DropIndex(
                name: "IX_Users_VipId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "VipId",
                table: "Users");
        }
    }
}
